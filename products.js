const express = require('express');
const router = express.Router();
const { watchProduct, listWatches } = require('../controllers/products');
const auth = require('../utils/auth');
router.post('/watch', auth, watchProduct);
router.get('/watches', auth, listWatches);
module.exports = router;
