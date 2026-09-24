const Contact = require('../models/Contact');

// POST /api/contact
exports.submitContact = async (req, res) => {
  try {
    const entry = await Contact.create(req.body);
    res.status(201).json({ message: 'Thank you! We will contact you soon.', entry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/contact  (admin view of submitted messages)
exports.getContacts = async (req, res) => {
  try {
    const entries = await Contact.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
