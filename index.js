// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes'); // Import faculty routes
const uploadRoutes = require('./routes/uploadRoutes'); // Import upload routes

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Use routes for API
app.use('/api', studentRoutes);
app.use('/api', facultyRoutes); // Add faculty routes
app.use('/api', uploadRoutes); // Add upload routes

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start the server on the specified port or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 
