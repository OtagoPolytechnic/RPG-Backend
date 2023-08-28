import { Router } from 'express';
import { getAllBuilds } from '../../controllers/v1/builds.mjs';
import seedBuilds from '../../controllers/v1/seedBuilds.mjs';

const router = Router();

// Get all categories and create categories
router.route('/').get(getAllBuilds);
router.route('/create').get(seedBuilds);


export default router;