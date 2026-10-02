import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import app from '../backend/src/app.js';
import { resetData } from '../backend/src/utils/data.js';

let server;
let base;

const request = async (path, options = {}) => {
  const response = await fetch(`${base}${path}`, {
    method: options.method || 'GET',
    headers: { 'content-type': 'application/json', ...(options.token ? { authorization: `Bearer ${options.token}` } : {}) },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  return { status: response.status, body: await response.json() };
};

before(async () => {
  resetData();
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}/api`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test('rejects invalid signup fields and forces public signup to USER', async () => {
  const invalid = await request('/auth/signup', { method: 'POST', body: { name: 'Too short', email: 'bad', password: 'weak', address: '' } });
  assert.equal(invalid.status, 400);
  assert.ok(invalid.body.errors.length >= 3);

  const email = `test-${Date.now()}@revora.app`;
  const valid = await request('/auth/signup', { method: 'POST', body: { name: 'A considered REVORA community member', email, password: 'Welcome!2', address: '1 Test Street' } });
  assert.equal(valid.status, 201);
  assert.equal(valid.body.user.role, 'USER');
  assert.ok(valid.body.token);
});

test('logs in and blocks a normal member from admin routes', async () => {
  const login = await request('/auth/login', { method: 'POST', body: { email: 'nora@revora.app', password: 'User!2345' } });
  assert.equal(login.status, 200);
  assert.equal(login.body.user.role, 'USER');
  const blocked = await request('/admin/stats', { token: login.body.token });
  assert.equal(blocked.status, 403);
});

test('creates and updates one rating, then computes the average', async () => {
  const login = await request('/auth/login', { method: 'POST', body: { email: 'nora@revora.app', password: 'User!2345' } });
  const created = await request('/stores/store_003/ratings', { method: 'POST', token: login.body.token, body: { rating: 4 } });
  assert.equal(created.status, 201);
  const updated = await request('/stores/store_003/ratings', { method: 'PUT', token: login.body.token, body: { rating: 5 } });
  assert.equal(updated.status, 200);
  const stores = await request('/stores?search=coffee', { token: login.body.token });
  assert.equal(stores.body.items[0].myRating, 5);
  assert.equal(stores.body.items[0].avgRating, 5);
});

test('supports city and location input to find nearest cafes and restaurants', async () => {
  // Login with city Mumbai
  const login = await request('/auth/login', {
    method: 'POST',
    body: { email: 'nora@revora.app', password: 'User!2345', city: 'Mumbai', lat: 19.0558, lng: 72.8315 },
  });
  assert.equal(login.status, 200);
  assert.equal(login.body.user.city, 'Mumbai');

  // Query stores with Mumbai coordinates
  const stores = await request('/stores?city=Mumbai&lat=19.0558&lng=72.8315', { token: login.body.token });
  assert.equal(stores.status, 200);
  assert.ok(stores.body.items.length > 0);
  // Nearest store should be Subko Coffee (lat 19.0558, lng 72.8315 => distance 0 km)
  assert.equal(stores.body.items[0].city, 'Mumbai');
  assert.equal(stores.body.items[0].distanceKm, 0);

  // Update location via PUT /auth/location to Delhi
  const locUpdate = await request('/auth/location', {
    method: 'PUT',
    token: login.body.token,
    body: { city: 'Delhi', lat: 28.5919, lng: 77.2374 },
  });
  assert.equal(locUpdate.status, 200);
  assert.equal(locUpdate.body.user.city, 'Delhi');

  // Query stores near Delhi
  const delhiStores = await request('/stores?city=Delhi&onlyCity=true', { token: login.body.token });
  assert.equal(delhiStores.status, 200);
  assert.ok(delhiStores.body.items.every((s) => s.city === 'Delhi'));
});
