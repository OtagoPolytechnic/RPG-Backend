import { Router } from 'express';
import { sellItem } from '../../controllers/v1/merchant.mjs';

const router = Router();

// Get all categories and create categories
router.route('/').post(sellItem)



export default router;
