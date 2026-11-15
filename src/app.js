 
import express from 'express';
import postRouster from './routes/posts.routes.js';
import uploadRouter from './routes/upload.routes.js';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});
app.use('/post', postRouster);

// photo upload just profile
app.use('/api/v1', uploadRouter);

export default app;