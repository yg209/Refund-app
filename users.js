const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const password_hash = bcrypt.hashSync(password, 10);
    const user = await User.create({ email, password_hash });
    res.json({ id: user.id, email: user.email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !user.validPassword(password)) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.profile = async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: ['id','email','plan','payout_method','createdAt'] });
  res.json(user);
};
