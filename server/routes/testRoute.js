import { Router } from 'express'
import { test } from '../controllers/test.js'

const router = Router();

router.get('/1', test);

export default router;