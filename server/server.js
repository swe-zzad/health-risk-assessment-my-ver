const express = require('express'); 
const path = require('path');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for frontend
app.use(cors({ origin: '*', method: ["GET", "POST" ,"UPDATE"]}));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to roll a dice
function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// API endpoint for rolling the dice
app.get('/roll', (req, res) => {
  const sides = parseInt(req.query.sides) || 6;
  
  if (isNaN(sides) || sides < 2) {
    return res.status(400).json({ error: "Invalid dice sides!" });
  }

  const roll = rollDice(sides);
  res.json({ roll });
});

// Serve index.html for direct access
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🎲 Dice Roller API running at http://localhost:${PORT}`);
});
