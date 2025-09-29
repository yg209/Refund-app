const express = require('express');
const bodyParser = require('body-parser');
const refundRoutes = require('./routes/refunds');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/refunds', refundRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Refund Guardian backend running on port ${PORT}`));
