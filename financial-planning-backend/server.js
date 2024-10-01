const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');  // Import the cors middleware
dotenv.config();


// Connect to MongoDB
connectDB();

const app = express();
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

// Import routes
const authRoutes = require('./routes/auth');
const surveyRoutes = require('./routes/survey');
const adminRoutes = require('./routes/admin');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/survey', surveyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
