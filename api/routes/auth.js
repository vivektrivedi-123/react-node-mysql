import express from 'express';
import { login, logout, resgister } from '../controllers/auth.js';

const router = express.Router();

router.post('/register',resgister);
router.post('/login',login);
router.post('/logout',logout);

export default router