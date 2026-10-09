const express = require('express');
const cors = require('express');
const dotenv = require('dotenv');
const movieRoutes = require('./src/routes/movies');
const corsMiddleware = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(corsMiddleware());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'CineScope Backend is running' });
});

// Routes
app.use('/api/movies', movieRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
