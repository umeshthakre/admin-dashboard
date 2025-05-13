import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import { generalLimiter } from './middlewares/rateLimiter.js';
const app = express();
const port = 3000;

const {MONGO_DB_URI} = process.env;

app.use(cors())
app.use(generalLimiter)
app.use(express.json())
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(authRoutes)
app.use("/reports",reportRoutes)
app.use("/users",userRoutes)
// app.post('/auth/login',(req,res)=>{
  
// })


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit with failure
  }
};

connectDB();



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
