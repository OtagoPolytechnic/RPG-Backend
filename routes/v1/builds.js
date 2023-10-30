import { Router } from 'express';
import { getAllBuilds } from '../../controllers/v1/builds.mjs';

const router = Router();

// Get all categories and create categories
router.route('/').get(getAllBuilds);


export default router;