import express from 'express'

import { getAllusers } from '../controllers/user.js'

const router = express.Router();

router.get('/getAll');

export default router;