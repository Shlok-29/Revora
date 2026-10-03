import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Admin!234', 10);
  await prisma.user.upsert({
    where: { email: 'admin@revora.app' },
    update: {},
    create: {
      name: 'Avery Sterling',
      email: 'admin@revora.app',
      passwordHash: password,
      address: '14 Observatory Way, New York, NY',
      role: 'ADMIN',
    },
  });
  console.log('Seed completed successfully');
}

main().finally(() => prisma.$disconnect());
