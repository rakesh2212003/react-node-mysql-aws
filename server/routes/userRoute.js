import express from 'express'
import { signup, login } from '../controllers/auth.js'
import { getAllusers } from '../controllers/user.js'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/getAllusers', getAllusers);

export default router;