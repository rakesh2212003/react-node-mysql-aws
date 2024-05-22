import express from 'express'
import dotenv from 'dotenv'
import cors from  'cors'

import testRoute from './routes/testRoute.js'
import userRoute from './routes/userRoute.js'

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

//routes
app.use('/test', testRoute);
app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})