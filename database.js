const { Sequelize } = require('sequelize');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/refundapp';
const sequelize = new Sequelize(connectionString, { dialect: 'postgres', logging: false });
module.exports = sequelize;
