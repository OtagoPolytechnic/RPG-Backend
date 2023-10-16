import { Router } from 'express';
import { getLocations, getLocation } from '../../controllers/v1/location.mjs';

const router = Router();

// Get all categories and create categories
router.route('/').get(getLocations)
router.route('/:id').get(getLocation)


export default router;