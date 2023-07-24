/*
 * This file contains routes for user authentication, including registration and login.
 * It uses the Express router to define the routes.
 */

import { Router } from 'express';
const router = Router();

import { register, login } from '../../controllers/v1/auth.js';

router.route('/register').post(register);
router.route('/login').post(login);

export default router;
