const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    plan: { type: DataTypes.STRING, defaultValue: 'free' },
    payout_method: { type: DataTypes.JSONB }
  }, { tableName: 'users', timestamps: true });
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password_hash);
  };
  return User;
};
