import { Router } from 'express';
import { getLocations } from '../../controllers/v1/location.js';

const router = Router();

// Get all categories and create categories
router.route('/').get(getLocations)


export default router;