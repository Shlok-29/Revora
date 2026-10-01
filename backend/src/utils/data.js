import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';

export const db = {
  users: [],
  stores: [],
  ratings: [],
};

const now = (daysAgo = 0) => new Date(Date.now() - daysAgo * 86400000).toISOString();
const passwordHash = (password) => bcrypt.hashSync(password, 10);

export const makeId = (prefix) => `${prefix}_${randomUUID().slice(0, 12)}`;

export const resetData = () => {
  db.users = [
    {
      id: 'usr_admin_001',
      name: 'Avery Sterling',
      email: 'admin@revora.app',
      passwordHash: passwordHash('Admin!234'),
      address: '14 Observatory Way, New York, NY',
      role: 'ADMIN',
      createdAt: now(120),
      updatedAt: now(2),
    },
    {
      id: 'usr_owner_001',
      name: 'Mara Ellison',
      email: 'owner@revora.app',
      passwordHash: passwordHash('Owner!234'),
      address: '82 Alder Street, Portland, OR',
      role: 'STORE_OWNER',
      createdAt: now(90),
      updatedAt: now(5),
    },
    {
      id: 'usr_owner_002',
      name: 'Jon Bellweather',
      email: 'jon@revora.app',
      passwordHash: passwordHash('Owner!234'),
      address: '5 Market Lane, Austin, TX',
      role: 'STORE_OWNER',
      createdAt: now(86),
      updatedAt: now(4),
    },
    {
      id: 'usr_user_001',
      name: 'Nora Alvarez',
      email: 'nora@revora.app',
      passwordHash: passwordHash('User!2345'),
      address: '111 Garden Avenue, Portland, OR',
      role: 'USER',
      createdAt: now(40),
      updatedAt: now(10),
    },
    {
      id: 'usr_user_002',
      name: 'Theo Whitman',
      email: 'theo@revora.app',
      passwordHash: passwordHash('User!2345'),
      address: '39 Juniper Road, Austin, TX',
      role: 'USER',
      createdAt: now(32),
      updatedAt: now(8),
    },
    {
      id: 'usr_user_003',
      name: 'Priya Nanduri',
      email: 'priya@revora.app',
      passwordHash: passwordHash('User!2345'),
      address: '4 Hawthorn Court, Seattle, WA',
      role: 'USER',
      createdAt: now(25),
      updatedAt: now(7),
    },
  ];

  db.stores = [
    {
      id: 'store_001',
      name: 'Field & Finch',
      email: 'hello@fieldandfinch.com',
      address: '82 Alder Street, Portland, OR',
      ownerId: 'usr_owner_001',
      createdAt: now(84),
      updatedAt: now(5),
    },
    {
      id: 'store_002',
      name: 'Northline Books',
      email: 'hello@northlinebooks.com',
      address: '5 Market Lane, Austin, TX',
      ownerId: 'usr_owner_002',
      createdAt: now(76),
      updatedAt: now(4),
    },
    {
      id: 'store_003',
      name: 'Morrow Coffee Lab',
      email: 'hello@morrowcoffee.com',
      address: '211 Cedar Street, Seattle, WA',
      ownerId: null,
      createdAt: now(63),
      updatedAt: now(13),
    },
    {
      id: 'store_004',
      name: 'Common Thread Market',
      email: 'hello@commonthread.market',
      address: '18 Olive Avenue, Brooklyn, NY',
      ownerId: null,
      createdAt: now(41),
      updatedAt: now(11),
    },
    {
      id: 'store_005',
      name: 'Signal House Plants',
      email: 'hello@signalhouseplants.com',
      address: '73 Willow Road, Los Angeles, CA',
      ownerId: null,
      createdAt: now(28),
      updatedAt: now(9),
    },
  ];

  db.ratings = [
    { id: 'rating_001', userId: 'usr_user_001', storeId: 'store_001', rating: 5, createdAt: now(12), updatedAt: now(12) },
    { id: 'rating_002', userId: 'usr_user_002', storeId: 'store_001', rating: 4, createdAt: now(8), updatedAt: now(8) },
    { id: 'rating_003', userId: 'usr_user_003', storeId: 'store_001', rating: 5, createdAt: now(3), updatedAt: now(3) },
    { id: 'rating_004', userId: 'usr_user_001', storeId: 'store_002', rating: 4, createdAt: now(16), updatedAt: now(16) },
    { id: 'rating_005', userId: 'usr_user_002', storeId: 'store_002', rating: 3, createdAt: now(6), updatedAt: now(6) },
    { id: 'rating_006', userId: 'usr_user_003', storeId: 'store_003', rating: 5, createdAt: now(4), updatedAt: now(4) },
    { id: 'rating_007', userId: 'usr_user_002', storeId: 'store_004', rating: 4, createdAt: now(9), updatedAt: now(9) },
  ];
};

export const getUser = (id) => db.users.find((user) => user.id === id);
export const getStore = (id) => db.stores.find((store) => store.id === id);
export const getRating = (userId, storeId) => db.ratings.find((rating) => rating.userId === userId && rating.storeId === storeId);

export const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  address: user.address,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const averageForStore = (storeId) => {
  const ratings = db.ratings.filter((rating) => rating.storeId === storeId);
  if (!ratings.length) return null;
  return Math.round((ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length) * 10) / 10;
};

export const countForStore = (storeId) => db.ratings.filter((rating) => rating.storeId === storeId).length;

resetData();
