import { Router } from 'express';
import { createCharacter } from '../../controllers/v1/character.js';

const router = Router();

// Get all categories and create categories
router.route('/create').post(createCharacter);


export default router;
