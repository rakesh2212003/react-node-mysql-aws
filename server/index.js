import express from 'express'
import dotenv from 'dotenv'
import cors from  'cors'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
// import adminRoutes from './routes/adminRoutes.js'

import verifyToken from './middlewares/authMiddleware.js'
// import checkAdmin from './middlewares/adminMiddleware.js'

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', verifyToken, userRoutes);
// app.use('/admin', verifyToken, checkAdmin, adminRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})