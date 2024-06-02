import express from 'express'

import { signup, login } from '../controllers/auth.js'
import { deleteUser, getAllusers } from '../controllers/user.js'
import { verifyToken, verifyAdminToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

//public routes
router.post('/signup', signup);
router.post('/login', login);

//private routes
router.patch('/delete', verifyToken, deleteUser);

//admin routes
router.get('/getAll', verifyAdminToken, getAllusers);

export default router;