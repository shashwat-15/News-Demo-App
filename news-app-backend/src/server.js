import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import swaggerSetup from '../swagger.js';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from '../swaggerOutput.json' assert { type: 'json' };

import newsRoutes from './routes/newsRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

swaggerSetup(app);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Use the routes
app.use('/api/news', newsRoutes);
app.use('/api', favoriteRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
