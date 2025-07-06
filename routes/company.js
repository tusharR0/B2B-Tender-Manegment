// backend/routes/company.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// 🛠️ These must match exported function names exactly:
router.post('/profile', companyController.createOrUpdateProfile);
router.get('/profile/:email', companyController.getProfile);


module.exports = router;
