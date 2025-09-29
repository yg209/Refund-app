const express = require('express');
const router = express.Router();
const { requestPayout, listPayouts } = require('../controllers/payouts');
const auth = require('../utils/auth');
router.post('/request', auth, requestPayout);
router.get('/', auth, listPayouts);
module.exports = router;
