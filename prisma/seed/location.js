import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { location } from '../../data/location.js';

const seedLocations = async () => {

  await prisma.location.createMany({
    data: location,
  });
  console.log('Locations Created');
};

seedLocations()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

export { seedLocations };
