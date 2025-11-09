const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
app.use(bodyParser.json());

// Temporary in-memory data for demo
const moods = [];
const recipes = [
  { id: 1, name: 'Sunny Salad', moodTags: ['happy', 'energized'] },
  { id: 2, name: 'Comfort Soup', moodTags: ['sad', 'tired'] },
  { id: 3, name: 'Spicy Curry', moodTags: ['angry', 'motivated'] }
];

// POST /moods - submit current mood
app.post('/moods', (req, res) => {
  const { userId, mood } = req.body;
  if (!userId || !mood) {
    return res.status(400).json({ error: 'userId and mood required' });
  }
  moods.push({ userId, mood, timestamp: new Date() });
  res.status(201).json({ message: 'Mood recorded' });
});

// GET /recipes - get recipes by mood query
app.get('/recipes', (req, res) => {
  const moodQuery = req.query.mood;
  if (!moodQuery) {
    return res.status(400).json({ error: 'Mood query param required' });
  }
  const matchedRecipes = recipes.filter(r => r.moodTags.includes(moodQuery.toLowerCase()));
  res.json(matchedRecipes);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
});
