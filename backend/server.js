require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
};
app.use(cors(corsOptions));
app.use(express.json()); // for parsing application/json

// API Routes
app.use('/api', taskRoutes);

// Simple route for health check
app.get('/healthcheck', async (req, res) => {
  try {
    // The .authenticate() method is a quick way to test if a connection can be made.
    await sequelize.authenticate();
    res.status(200).json({ status: 'UP', message: 'Backend server is running and database is connected.' });
  } catch (error) {
    res.status(503).json({ status: 'DOWN', message: 'Backend server is running but database connection failed.', error: error.message });
  }
});

// Database connection and server start
const PORT = process.env.PORT || 8000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    // Sync models with the database
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
