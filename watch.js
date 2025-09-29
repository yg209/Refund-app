const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Watch = sequelize.define('Watch', {
    receipt_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    min_price: DataTypes.FLOAT,
    status: { type: DataTypes.STRING, defaultValue: 'watching' }
  }, { tableName: 'watches', timestamps: true });
  return Watch;
};
