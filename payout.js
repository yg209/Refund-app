const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Payout = sequelize.define('Payout', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: DataTypes.FLOAT,
    method: DataTypes.STRING,
    status: { type: DataTypes.STRING, defaultValue: 'pending' }
  }, { tableName: 'payouts', timestamps: true });
  return Payout;
};
