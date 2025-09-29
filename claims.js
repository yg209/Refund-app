const express = require('express');
const router = express.Router();
const { submitClaim, getClaim } = require('../controllers/claims');
const auth = require('../utils/auth');
router.post('/submit', auth, submitClaim);
router.get('/:id', auth, getClaim);
module.exports = router;
