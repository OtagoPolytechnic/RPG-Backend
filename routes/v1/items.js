import { Router } from 'express';
import { createItem, getAllItems, characterItems, addItemToCharacter } from '../../controllers/v1/items.js';

const router = Router();

// Get all categories and create categories
router.route('/').get(getAllItems)
router.route('/create').post(createItem);
router.route('/inventory').get(characterItems).post(addItemToCharacter);


export default router;