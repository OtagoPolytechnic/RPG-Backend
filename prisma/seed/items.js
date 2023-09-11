import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { items } from '../../data/items.js';

const seedItems = async () => {

  await prisma.item.createMany({
    data: items,
  });

  console.log('Items Created');
};

seedItems()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

export { seedItems };