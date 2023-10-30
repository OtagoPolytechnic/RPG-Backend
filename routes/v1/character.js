import { Router } from 'express';
import { createCharacter, getAllCharacters, getCharacter, characterItems, addItemToCharacter, updateCharacter } from '../../controllers/v1/character.mjs';

const router = Router();

// Get all categories and create categories
router.route('/').get(getAllCharacters)
router.route('/:name').get(getCharacter);
router.route('/inventory/add').post(addItemToCharacter);
router.route('/inventory/:characterId').get(characterItems)
router.route('/create').post(createCharacter);
router.route('/update/:characterId').put(updateCharacter);


export default router;
