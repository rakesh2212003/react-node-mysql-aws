import express from 'express'
import { getAllUsers } from '../controllers/adminControllers.js'

const router = express.Router();

router.get('/getAll', getAllUsers);

export default router;