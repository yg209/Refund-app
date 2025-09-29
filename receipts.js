const { Receipt } = require('../models');
const { parseReceipt } = require('../utils/ocr');
const { checkDuplicate } = require('../utils/fraud');
exports.uploadReceipt = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const isDup = await checkDuplicate(req.file.buffer);
    if (isDup) return res.status(400).json({ error: 'Duplicate receipt detected' });
    const parsed = await parseReceipt(req.file.buffer);
    const receipt = await Receipt.create({
      user_id: req.user.id,
      raw_image: req.file.buffer,
      ocr_confidence: parsed.confidence,
      line_items: { text: parsed.text }
    });
    res.json(receipt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
exports.getReceipt = async (req, res) => {
  const receipt = await Receipt.findByPk(req.params.id);
  if (!receipt) return res.status(404).json({ error: 'Not found' });
  res.json(receipt);
};
exports.listReceipts = async (req, res) => {
  const receipts = await Receipt.findAll({ where: { user_id: req.user.id } });
  res.json(receipts);
};
