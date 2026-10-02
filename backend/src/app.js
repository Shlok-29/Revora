import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  averageForStore,
  countForStore,
  db,
  getRating,
  getStore,
  getUser,
  makeId,
  publicUser,
  saveDbToFile,
  loadDbFromFile,
} from './utils/data.js';
import { INDIAN_CITIES, calculateDistanceKm, findNearestIndianCity } from './utils/indianCities.js';

const JWT_SECRET = process.env.JWT_SECRET || 'revora-local-development-secret';
const FRONTEND_DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../frontend/dist');

export class AppError extends Error {
  constructor(status, message, errors = undefined) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

const app = express();
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false, frameguard: false }));
app.use(cors({ origin: process.env.CORS_ORIGIN || true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 400, standardHeaders: true, legacyHeaders: false }));

const respond = (res, data, status = 200) => res.status(status).json({ success: true, ...data });
const fail = (status, message, errors) => { throw new AppError(status, message, errors); };
const sortValue = (value) => (value === 'desc' ? 'desc' : 'asc');
const paginate = (items, page = 1, limit = 10) => {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);
  const start = (safePage - 1) * safeLimit;
  return { items: items.slice(start, start + safeLimit), page: safePage, limit: safeLimit, total: items.length, totalPages: Math.max(Math.ceil(items.length / safeLimit), 1) };
};
const parseBody = (schema, body) => {
  const parsed = schema.safeParse(body);
  if (!parsed.success) fail(400, 'Please check the highlighted fields.', parsed.error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message })));
  return parsed.data;
};

const userSchema = z.object({
  name: z.string().trim().min(20, 'Name must be at least 20 characters.').max(60, 'Name must be 60 characters or fewer.'),
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().regex(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/, 'Password must be 8–16 characters with an uppercase letter and special character.'),
  address: z.string().trim().max(400, 'Address must be 400 characters or fewer.'),
  city: z.string().trim().optional(),
  lat: z.number().optional().nullable(),
  lng: z.number().optional().nullable(),
  role: z.enum(['ADMIN', 'USER', 'STORE_OWNER']).default('USER'),
});
const signupSchema = userSchema.omit({ role: true });
const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
  city: z.string().optional().nullable(),
  lat: z.number().optional().nullable(),
  lng: z.number().optional().nullable(),
});
const passwordSchema = z.object({ oldPassword: z.string().min(1, 'Current password is required.'), newPassword: userSchema.shape.password });
const storeSchema = z.object({
  name: z.string().trim().min(2, 'Store name is required.').max(120),
  email: z.string().trim().email('Enter a valid store email.'),
  address: z.string().trim().max(400),
  city: z.string().trim().optional(),
  category: z.string().trim().optional(),
  ownerId: z.string().nullable().optional(),
});
const ratingSchema = z.object({ rating: z.number().int().min(1, 'Rating must be between 1 and 5.').max(5, 'Rating must be between 1 and 5.') });

const tokenFor = (user) => jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
const authenticate = (req, _res, next) => {
  try {
    const header = req.get('authorization') || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : req.cookies?.revora_token;
    if (!token) fail(401, 'Authentication required.');
    const payload = jwt.verify(token, JWT_SECRET);
    let user = getUser(payload.sub);
    if (!user) {
      loadDbFromFile();
      user = getUser(payload.sub);
    }
    if (!user) fail(401, 'Your session is no longer valid.');
    req.user = user;
    next();
  } catch (error) {
    next(error instanceof AppError ? error : new AppError(401, 'Your session is no longer valid.'));
  }
};
const authorize = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return next(new AppError(403, 'You do not have permission to view this area.'));
  next();
};

const withStoreStats = (store, currentUserId, userCoords = null) => {
  let distanceKm = null;
  if (userCoords && userCoords.lat != null && userCoords.lng != null && store.lat != null && store.lng != null) {
    distanceKm = calculateDistanceKm(userCoords.lat, userCoords.lng, store.lat, store.lng);
  }
  return {
    id: store.id,
    name: store.name,
    email: store.email,
    address: store.address,
    city: store.city || null,
    category: store.category || 'Place',
    tags: store.tags || [],
    lat: store.lat ?? null,
    lng: store.lng ?? null,
    distanceKm,
    ownerId: store.ownerId,
    ownerName: store.ownerId ? getUser(store.ownerId)?.name || null : null,
    avgRating: averageForStore(store.id),
    ratingCount: countForStore(store.id),
    myRating: currentUserId ? getRating(currentUserId, store.id)?.rating || null : null,
    createdAt: store.createdAt,
  };
};

app.get('/api/health', (_req, res) => respond(res, { status: 'ok', service: 'revora-api', mode: 'seeded-demo' }));

app.get('/api/auth/me', authenticate, (req, res) => respond(res, { user: publicUser(req.user) }));

app.get('/api/cities', (_req, res) => respond(res, { cities: INDIAN_CITIES }));

app.post('/api/auth/signup', (req, res, next) => {
  try {
    const input = parseBody(signupSchema, req.body);
    if (db.users.some((user) => user.email.toLowerCase() === input.email.toLowerCase())) fail(409, 'An account with that email already exists.');
    const user = {
      id: makeId('usr'),
      ...input,
      city: input.city || null,
      lat: input.lat ?? null,
      lng: input.lng ?? null,
      email: input.email.toLowerCase(),
      passwordHash: bcrypt.hashSync(input.password, 10),
      role: 'USER',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.users.push(user);
    saveDbToFile();
    respond(res, { user: publicUser(user), token: tokenFor(user) }, 201);
  } catch (error) { next(error); }
});

app.post('/api/auth/login', (req, res, next) => {
  try {
    const input = parseBody(loginSchema, req.body);
    const user = db.users.find((candidate) => candidate.email.toLowerCase() === input.email.toLowerCase());
    if (!user || !bcrypt.compareSync(input.password, user.passwordHash)) fail(401, 'Email or password is incorrect.');
    if (input.city) user.city = input.city;
    if (input.lat != null) user.lat = input.lat;
    if (input.lng != null) user.lng = input.lng;
    saveDbToFile();
    respond(res, { user: publicUser(user), token: tokenFor(user) });
  } catch (error) { next(error); }
});

app.put('/api/auth/location', authenticate, (req, res) => {
  const { city, lat, lng } = req.body || {};
  if (city) req.user.city = city;
  if (lat != null && !Number.isNaN(Number(lat))) req.user.lat = Number(lat);
  if (lng != null && !Number.isNaN(Number(lng))) req.user.lng = Number(lng);
  req.user.updatedAt = new Date().toISOString();
  saveDbToFile();
  respond(res, { user: publicUser(req.user), message: 'Location updated.' });
});

app.put('/api/auth/password', authenticate, (req, res, next) => {
  try {
    const input = parseBody(passwordSchema, req.body);
    if (!bcrypt.compareSync(input.oldPassword, req.user.passwordHash)) fail(400, 'Your current password is incorrect.');
    req.user.passwordHash = bcrypt.hashSync(input.newPassword, 10);
    req.user.updatedAt = new Date().toISOString();
    saveDbToFile();
    respond(res, { message: 'Password updated successfully.' });
  } catch (error) { next(error); }
});

app.get('/api/admin/stats', authenticate, authorize('ADMIN'), (_req, res) => respond(res, { stats: { users: db.users.length, stores: db.stores.length, ratings: db.ratings.length } }));

app.get('/api/admin/users', authenticate, authorize('ADMIN'), (req, res) => {
  const { name = '', email = '', address = '', role = '', sortBy = 'createdAt', order = 'desc', page, limit } = req.query;
  const allowedSorts = ['name', 'email', 'address', 'role', 'createdAt'];
  const sortKey = allowedSorts.includes(sortBy) ? sortBy : 'createdAt';
  const direction = sortValue(order) === 'asc' ? 1 : -1;
  const filtered = db.users.filter((user) => [user.name, user.email, user.address, user.city || ''].join(' ').toLowerCase().includes(`${name} ${email} ${address}`.trim().toLowerCase()) && (!role || user.role === role)).sort((a, b) => String(a[sortKey]).localeCompare(String(b[sortKey])) * direction).map(publicUser);
  respond(res, { ...paginate(filtered, page, limit) });
});

app.get('/api/admin/users/:id', authenticate, authorize('ADMIN'), (req, res, next) => {
  const user = getUser(req.params.id);
  if (!user) return next(new AppError(404, 'User not found.'));
  const ownedStores = db.stores.filter((store) => store.ownerId === user.id).map((store) => withStoreStats(store));
  respond(res, { user: { ...publicUser(user), ownedStores, ownerAverage: ownedStores.length ? Math.round((ownedStores.reduce((sum, store) => sum + (store.avgRating || 0), 0) / ownedStores.length) * 10) / 10 : null } });
});

app.post('/api/admin/users', authenticate, authorize('ADMIN'), (req, res, next) => {
  try {
    const input = parseBody(userSchema, req.body);
    if (db.users.some((user) => user.email.toLowerCase() === input.email.toLowerCase())) fail(409, 'An account with that email already exists.');
    const user = {
      id: makeId('usr'),
      ...input,
      city: input.city || null,
      lat: input.lat ?? null,
      lng: input.lng ?? null,
      email: input.email.toLowerCase(),
      passwordHash: bcrypt.hashSync(input.password, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.users.push(user);
    respond(res, { user: publicUser(user), message: 'User created successfully.' }, 201);
  } catch (error) { next(error); }
});

app.get('/api/admin/stores', authenticate, authorize('ADMIN'), (req, res) => {
  const { name = '', email = '', address = '', sortBy = 'name', order = 'asc', page, limit } = req.query;
  const allowedSorts = ['name', 'email', 'address', 'avgRating', 'ratingCount'];
  const sortKey = allowedSorts.includes(sortBy) ? sortBy : 'name';
  const direction = sortValue(order) === 'asc' ? 1 : -1;
  const filtered = db.stores.filter((store) => `${store.name} ${store.email} ${store.address} ${store.city || ''}`.toLowerCase().includes(`${name} ${email} ${address}`.trim().toLowerCase())).map((store) => withStoreStats(store)).sort((a, b) => String(a[sortKey] ?? '').localeCompare(String(b[sortKey] ?? '')) * direction);
  respond(res, { ...paginate(filtered, page, limit) });
});

app.post('/api/admin/stores', authenticate, authorize('ADMIN'), (req, res, next) => {
  try {
    const input = parseBody(storeSchema, req.body);
    if (db.stores.some((store) => store.email.toLowerCase() === input.email.toLowerCase())) fail(409, 'A store with that email already exists.');
    if (input.ownerId && (!getUser(input.ownerId) || getUser(input.ownerId).role !== 'STORE_OWNER')) fail(400, 'Owner must be an existing Store Owner.');
    const store = {
      id: makeId('store'),
      ...input,
      city: input.city || null,
      category: input.category || 'Cafe & Restaurant',
      tags: [],
      lat: null,
      lng: null,
      email: input.email.toLowerCase(),
      ownerId: input.ownerId || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.stores.push(store);
    respond(res, { store: withStoreStats(store), message: 'Store added successfully.' }, 201);
  } catch (error) { next(error); }
});

app.get('/api/stores', authenticate, authorize('USER'), (req, res) => {
  const {
    search = '',
    city = '',
    category = '',
    onlyCity,
    lat,
    lng,
    sortBy = 'distance',
    order,
    page,
    limit,
  } = req.query;

  // Resolve user coords
  let userCoords = null;
  if (lat != null && lng != null && !Number.isNaN(Number(lat)) && !Number.isNaN(Number(lng))) {
    userCoords = { lat: Number(lat), lng: Number(lng) };
  } else if (req.user?.lat != null && req.user?.lng != null) {
    userCoords = { lat: req.user.lat, lng: req.user.lng };
  } else if (city) {
    const foundCity = INDIAN_CITIES.find((c) => c.name.toLowerCase() === String(city).trim().toLowerCase());
    if (foundCity) {
      userCoords = { lat: foundCity.lat, lng: foundCity.lng };
    }
  }

  const query = String(search).toLowerCase();
  const catQuery = String(category).toLowerCase();
  const cityQuery = String(city).toLowerCase().trim();

  // If a city is provided, default to strict city filtering unless onlyCity === 'false'
  const isOnlyCity = onlyCity !== undefined ? (onlyCity === 'true' || onlyCity === true) : Boolean(cityQuery);

  let filtered = db.stores.filter((store) => {
    // Exclude non-Indian / distant legacy stores unless specifically searched by text
    if (store.country === 'US' && !query) {
      if (cityQuery || userCoords) return false;
    }

    const textMatch = `${store.name} ${store.address} ${store.city || ''} ${store.category || ''} ${(store.tags || []).join(' ')}`.toLowerCase().includes(query);
    if (!textMatch) return false;

    if (catQuery && catQuery !== 'all') {
      const matchCat = (store.category || '').toLowerCase().includes(catQuery) ||
        (store.tags || []).some((t) => t.toLowerCase().includes(catQuery));
      if (!matchCat) return false;
    }

    if (isOnlyCity && cityQuery) {
      if ((store.city || '').toLowerCase() !== cityQuery) return false;
    }

    return true;
  }).map((store) => withStoreStats(store, req.user.id, userCoords));

  const allowedSorts = ['name', 'address', 'avgRating', 'ratingCount', 'distance'];
  const sortKey = allowedSorts.includes(sortBy) ? sortBy : 'distance';
  const defaultOrder = (sortKey === 'avgRating' || sortKey === 'ratingCount') ? 'desc' : 'asc';
  const direction = sortValue(order || defaultOrder) === 'asc' ? 1 : -1;

  filtered.sort((a, b) => {
    if (sortKey === 'distance') {
      if (a.distanceKm == null && b.distanceKm == null) return 0;
      if (a.distanceKm == null) return 1;
      if (b.distanceKm == null) return -1;
      return (a.distanceKm - b.distanceKm) * direction;
    }
    if (sortKey === 'avgRating' || sortKey === 'ratingCount') {
      const valA = a[sortKey] ?? -1;
      const valB = b[sortKey] ?? -1;
      if (valA !== valB) return (valA - valB) * direction;
      // Secondary sort: nearest distance
      if (a.distanceKm != null && b.distanceKm != null) return a.distanceKm - b.distanceKm;
      return a.name.localeCompare(b.name);
    }
    return String(a[sortKey] ?? '').localeCompare(String(b[sortKey] ?? '')) * direction;
  });

  // Prioritize nearest when distance coordinates exist and sort isn't specified or is default
  if (!req.query.sortBy && userCoords) {
    filtered.sort((a, b) => {
      if (cityQuery) {
        const aSame = (a.city || '').toLowerCase() === cityQuery ? 0 : 1;
        const bSame = (b.city || '').toLowerCase() === cityQuery ? 0 : 1;
        if (aSame !== bSame) return aSame - bSame;
      }
      if (a.distanceKm != null && b.distanceKm != null) {
        return a.distanceKm - b.distanceKm;
      }
      if (a.distanceKm != null) return -1;
      if (b.distanceKm != null) return 1;
      return a.name.localeCompare(b.name);
    });
  }

  respond(res, { ...paginate(filtered, page, limit) });
});

const rateStore = (req, res, next) => {
  try {
    const store = getStore(req.params.id);
    if (!store) fail(404, 'Store not found.');
    const input = parseBody(ratingSchema, req.body);
    const existing = getRating(req.user.id, store.id);
    if (existing) {
      existing.rating = input.rating;
      existing.updatedAt = new Date().toISOString();
      saveDbToFile();
      return respond(res, { rating: existing, message: 'Your rating was updated.' });
    }
    const rating = { id: makeId('rating'), userId: req.user.id, storeId: store.id, rating: input.rating, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    db.ratings.push(rating);
    saveDbToFile();
    return respond(res, { rating, message: 'Your rating was saved.' }, 201);
  } catch (error) { next(error); }
};
app.post('/api/stores/:id/ratings', authenticate, authorize('USER'), rateStore);
app.put('/api/stores/:id/ratings', authenticate, authorize('USER'), rateStore);

app.get('/api/owner/dashboard', authenticate, authorize('STORE_OWNER'), (req, res) => {
  const stores = db.stores.filter((store) => store.ownerId === req.user.id).map((store) => withStoreStats(store));
  const storeIds = new Set(stores.map((store) => store.id));
  const ratings = db.ratings.filter((rating) => storeIds.has(rating.storeId)).map((rating) => ({
    id: rating.id,
    name: getUser(rating.userId)?.name || 'Unknown user',
    email: getUser(rating.userId)?.email || '',
    rating: rating.rating,
    storeName: getStore(rating.storeId)?.name || '',
    date: rating.updatedAt,
  })).sort((a, b) => new Date(b.date) - new Date(a.date));
  const allRatings = ratings.map((rating) => rating.rating);
  respond(res, { dashboard: { stores, ratings, avgRating: allRatings.length ? Math.round((allRatings.reduce((sum, value) => sum + value, 0) / allRatings.length) * 10) / 10 : null, ratingCount: allRatings.length } });
});

app.use('/assets', express.static(path.join(FRONTEND_DIST, 'assets')));
app.use(express.static(FRONTEND_DIST));
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next(new AppError(404, 'API endpoint not found.'));
  res.sendFile(path.join(FRONTEND_DIST, 'index.html'), (error) => error && next(new AppError(404, 'Page not found.')));
});

app.use((error, _req, res, _next) => {
  const status = error.status || 500;
  if (status >= 500) console.error(error);
  res.status(status).json({ success: false, message: error.message || 'Something went wrong.', ...(error.errors ? { errors: error.errors } : {}) });
});

export default app;
