const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// ✅ SIGNUP: Save hashed user to MySQL
const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(sql, [email, hashedPassword], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Error creating user', error: err });
    }

    const token = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, email });
  });
};

// ✅ LOGIN: Validate user from MySQL and generate token
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, email: user.email });
  });
};

module.exports = { signup, login };

