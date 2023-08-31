import { seedLocations } from './location.js';
import { seedSuperAdminUsers } from './superadmin.mjs';

const seedCombined = async () => {
  try {
    console.log('Seeding locations...');
    await seedLocations();
    console.log('Locations seeded successfully.');

    console.log('Seeding superadmin users...');
    await seedSuperAdminUsers();
    console.log('Superadmin users seeded successfully.');
  } catch (error) {
    console.error('Error while seeding:', error);
    process.exit(1);
  }
};

export {seedCombined}
