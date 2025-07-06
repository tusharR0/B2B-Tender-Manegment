// backend/controllers/companyController.js
const db = require('../config/db');

const createOrUpdateProfile = (req, res) => {
  const { email, name, industry, description, logo_url } = req.body;

  const sql = `
    INSERT INTO company_profiles (email, name, industry, description, logo_url)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    industry = VALUES(industry),
    description = VALUES(description),
    logo_url = VALUES(logo_url)
  `;

  db.query(sql, [email, name, industry, description, logo_url], (err) => {
    if (err) {
      console.error('❌ DB error:', err);
      return res.status(500).json({ message: 'DB error', error: err });
    }
    res.json({ message: 'Profile saved successfully' });
  });
};

const getProfile = (req, res) => {
  const { email } = req.params;

  db.query('SELECT * FROM company_profiles WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('❌ DB error:', err);
      return res.status(500).json({ message: 'DB error', error: err });
    }

    if (results.length === 0) return res.status(404).json({ message: 'Company not found' });
    res.json(results[0]);
  });
};

module.exports = {
  createOrUpdateProfile,
  getProfile
};
