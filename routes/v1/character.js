import { Router } from 'express';
import { createCharacter, getAllCharacters, getCharacter } from '../../controllers/v1/character.mjs';

const router = Router();

// Get all categories and create categories
router.route('/').get(getAllCharacters)
router.route('/:name').get(getCharacter);
router.route('/create').post(createCharacter);


export default router;
