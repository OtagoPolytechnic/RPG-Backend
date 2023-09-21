import { Router } from 'express';
import { sellItem } from '../../controllers/v1/merchant.mjs';

const router = Router();

// Get all categories and create categories
router.route('/').get(getAllCharacters)
router.route('/:characterId').get(getCharacter);
router.route('/inventory/add').post(addItemToCharacter);
router.route('/inventory/:characterId').get(characterItems)
router.route('/create').post(createCharacter);
router.route('/update/:characterId').put(updateCharacter);


export default router;
