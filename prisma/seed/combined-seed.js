import { seedLocations } from './location.js';
import { seedSuperAdminUsers } from './superadmin.js';
import { seedItems } from './items.js';
import seedBuilds from './builds.js';



const seedCombined = async () => {
  try {
    
    await seedItems();

    await seedBuilds();

    await seedLocations();

    await seedSuperAdminUsers();

  } catch (error) {
    console.error('Error while seeding:', error);
    process.exit(1);
  }
};

export {seedCombined}
