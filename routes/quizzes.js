const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users (or specific data) from quizzes collection
router.get('/quizzes', async (req, res) => {
  try {
    // Fetch all documents from quizzes collection
    const users = await User.find({}, { user: 1, password: 1 }); // Include user and password fields
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

