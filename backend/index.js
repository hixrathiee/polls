import express from 'express';
import pollRouter from './routes/pollsRoute.js';
import connectDB from './config/db.js'; 
import cors from 'cors';
import "dotenv/config";
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({  
    origin: 'http://localhost:5173',
    credentials: true 
}));
app.use(express.json());
app.use('/polls', pollRouter);

app.listen(port, () => {
    connectDB()
    console.log(`Server is running on port ${port}`)
});