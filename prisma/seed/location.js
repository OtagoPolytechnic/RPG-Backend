import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { locations } from '../../data/location.js';

const seedLocations = async () => {

  console.log('Starting')
  await prisma.location.createMany({
    data: locations,
  });
  console.log(locations)
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
