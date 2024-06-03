import express from 'express'
import { getUser, updateUser, deleteUser } from '../controllers/userControllers.js'

const router = express.Router();

router.get('/get/:id', getUser);
router.put('/update/:id', updateUser);
router.patch('/delete/:id', deleteUser);

export default router;