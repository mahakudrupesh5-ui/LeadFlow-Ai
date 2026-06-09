const express = require('express');
const { createLead } = require('../controllers/leadsController');

const router = express.Router();

// POST /api/leads
// Accepts lead information from the frontend and sends a Gmail notification.
router.post('/', createLead);

module.exports = router;
