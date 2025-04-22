const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ValidStudent = require('../models/ValidStudents');

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
router.post('/register', async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    admissionNumber,
    branch,
    course,
    section
  } = req.body;

  try {
    // Admission number validation
    const valid = await ValidStudent.findOne({ admissionNumber });

    if (!valid) {
      return res.status(400).json({ msg: "Invalid admission number. Contact admin." });
    }

    if (
      valid.branch !== branch ||
      valid.section !== section ||
      valid.course !== course
    ) {
      return res.status(400).json({ msg: "Student details do not match college records." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      admissionNumber,
      branch,
      course,
      section
    });

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
