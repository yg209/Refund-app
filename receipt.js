const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Receipt = sequelize.define('Receipt', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    merchant: DataTypes.STRING,
    order_id: DataTypes.STRING,
    date: DataTypes.DATE,
    total: DataTypes.FLOAT,
    line_items: DataTypes.JSONB,
    raw_image: DataTypes.BLOB,
    ocr_confidence: DataTypes.FLOAT
  }, { tableName: 'receipts', timestamps: true });
  return Receipt;
};
