import React, { useState } from 'react';

function App() {
  const [mood, setMood] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    if (!mood) return;
    
    // Send mood to backend
    await fetch('http://localhost:3000/moods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 1, mood }),
    });

    // Get recipe recommendations
    const res = await fetch(`http://localhost:3000/recipes?mood=${mood}`);
    const data = await res.json();
    setRecipes(data);
  };

  return (
    <div>
      <h1>Mood-Based Recipe Recommendation</h1>
      <form onSubmit={handleMoodSubmit}>
        <input
          type="text"
          placeholder="Enter your mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <button type="submit">Get Recipes</button>
      </form>

      <h2>Recipe Recommendations</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
