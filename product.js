const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    sku: DataTypes.STRING,
    upc: DataTypes.STRING,
    title: DataTypes.STRING,
    images: DataTypes.JSONB
  }, { tableName: 'products', timestamps: true });
  return Product;
};
