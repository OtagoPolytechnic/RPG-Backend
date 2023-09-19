import { Router } from 'express';
import { createCharacter, getAllCharacters, getCharacter, characterItems, addItemToCharacter } from '../../controllers/v1/character.mjs';

const router = Router();

// Get all categories and create categories
router.route('/').get(getAllCharacters)
router.route('/:id').get(getCharacter);
router.route('/inventory/add/:characterId').post(addItemToCharacter);
router.route('inventory/:characterId').get(characterItems)
router.route('/create').post(createCharacter);


export default router;
