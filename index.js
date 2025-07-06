const express = require('express');
const cors = require('cors');
require('dotenv').config(); // ✅ Load env first

// ✅ Import MySQL connection
require('./config/db'); // this will connect and log MySQL status

// Routes
const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/company');
const uploadRoutes = require('./routes/upload');
const tenderRoutes = require('./routes/tender');
const applicationRoutes = require('./routes/application');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/tender', tenderRoutes);
app.use('/api/application', applicationRoutes);


// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
