const db = require('../config/db');

// 🔹 Submit Proposal
const submitProposal = (req, res) => {
  const { tender_id, company_email, proposal } = req.body;
  if (!tender_id || !company_email || !proposal) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const sql = `
    INSERT INTO applications (tender_id, company_email, proposal)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [tender_id, company_email, proposal], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    res.status(201).json({ message: 'Proposal submitted successfully' });
  });
};

// 🔹 Get Proposals for a Tender
const getProposalsByTender = (req, res) => {
  const { tender_id } = req.params;
  db.query('SELECT * FROM applications WHERE tender_id = ?', [tender_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    res.json({ applications: results });
  });
};

module.exports = {
  submitProposal,
  getProposalsByTender,
};
