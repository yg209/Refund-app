const express = require('express');
const bodyParser = require('body-parser');
const refundRoutes = require('./routes/refunds');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/refunds', refundRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Refund Guardian backend running on port ${PORT}`));
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  plan TEXT,
  starts_at TIMESTAMP,
  ends_at TIMESTAMP,
  active BOOL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE refunds (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  amount_usd NUMERIC(12,2),
  status TEXT DEFAULT 'pending', -- pending, processing, completed, rejected
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  provider_order_id TEXT,
  tx_hash TEXT
);

CREATE TABLE tokens_serials (
  id SERIAL PRIMARY KEY,
  serial TEXT UNIQUE NOT NULL,
  token_address TEXT,
  vault_address TEXT,
  owner_user_id INT,
  minted_at TIMESTAMP
);

CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  actor TEXT,
  action TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT now()
);