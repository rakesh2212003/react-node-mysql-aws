import express from 'express'
import dotenv from 'dotenv'
import cors from  'cors'

import authRoutes from './routes/auth/authRoutes.js'
// import userRoutes from './routes/userRoutes.js'
// import adminRoutes from './routes/adminRoutes.js'

// import verifyToken from './middlewares/authMiddleware.js'
// import checkAdmin from './middlewares/adminMiddleware.js'

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

// app.use('/user', verifyToken, userRoutes);
// app.use('/admin/user', verifyToken, adminRoutes);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})