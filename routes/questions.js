// backend/routes/questions.js
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// POST route to save quiz
router.post('/questions', async (req, res) => {
  const { quizName, questions } = req.body;

  const newQuiz = new Question({
    quizName,
    questions,
  });

  try {
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save quiz' });
  }
});

// GET route to fetch all quizzes
router.get('/questions', async (req, res) => {
  try {
    const quizzes = await Question.find();
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// GET route to fetch a specific quiz by ID
router.get('/questions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Question.findById(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

module.exports = router;

