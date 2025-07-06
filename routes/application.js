const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// POST: Submit proposal
router.post('/', applicationController.submitProposal);

// GET: Get all proposals for a tender
router.get('/:tender_id', applicationController.getProposalsByTender);

module.exports = router;
