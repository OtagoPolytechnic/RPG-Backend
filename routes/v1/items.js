import { Router } from 'express';
import { createItem, getAllItems } from '../../controllers/v1/items.js';

const router = Router();

// Get all categories and create categories
router.route('/').get(getAllItems)
router.route('/create').post(createItem);


export default router;