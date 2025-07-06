const express = require('express');
const router = express.Router();
const {
  createTender,
  listTenders,
  listCompanyTenders
} = require('../controllers/tenderController');

// API routes
router.post('/', createTender); // POST /api/tender
router.get('/', listTenders);   // GET /api/tender?page=1
router.get('/company/:email', listCompanyTenders); // GET /api/tender/company/:email?page=1

module.exports = router;
