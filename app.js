import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import blogRoutes from './routes/blogs.routes.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

// Enable CORS with credentials
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Middleware for parsing cookies, JSON, and URL-encoded data
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

app.all('*', (req, res) => {
  return res.status(400).send('OOPS!! PAGE NOT FOUND');
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
