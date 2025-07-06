// backend/controllers/tenderController.js
const db = require('../config/db');

// ✅ Create Tender
const createTender = (req, res) => {
  const { title, description, deadline, budget, email } = req.body;

  if (!email || !title || !description || !deadline || !budget) {
    return res.status(400).json({ message: 'All fields are required including email' });
  }

  const sql = `
    INSERT INTO tenders (email, title, description, deadline, budget)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [email, title, description, deadline, budget], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    res.status(201).json({ message: 'Tender created successfully' });
  });
};

// ✅ List All Tenders
const listTenders = (req, res) => {
  db.query('SELECT * FROM tenders ORDER BY deadline DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'DB Error', error: err });
    res.json({ tenders: results });
  });
};

// ✅ List Tenders By Company Email
const listCompanyTenders = (req, res) => {
  const { email } = req.params;
  db.query('SELECT * FROM tenders WHERE email = ? ORDER BY deadline DESC', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB Error', error: err });
    res.json({ tenders: results });
  });
};

// ✅ Correct export
module.exports = {
  createTender,
  listTenders,
  listCompanyTenders
};
