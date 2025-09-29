const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Claim = sequelize.define('Claim', {
    receipt_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: DataTypes.INTEGER,
    retailer: DataTypes.STRING,
    submitted_at: DataTypes.DATE,
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
    payout: DataTypes.FLOAT
  }, { tableName: 'claims', timestamps: true });
  return Claim;
};
