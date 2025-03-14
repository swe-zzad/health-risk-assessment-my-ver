const express = require('express');
const app = express();
const port = 8080;

const cors = require('cors');
app.use(cors());


app.use(express.json()); // Middleware to parse JSON requests

// API endpoint to calculate the risk
app.post('/api/calculate-risk', (req, res) => {
    const { age, height, weight, bloodPressure, familyHistory } = req.body;

    // Risk calculation logic (as per your project requirements)
    let riskScore = 0;

    // Age scoring
    if (age < 30) riskScore += 0;
    else if (age < 45) riskScore += 10;
    else if (age < 60) riskScore += 20;
    else riskScore += 30;

    // BMI calculation
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2); // BMI = weight / (height in meters)^2
    if (bmi < 25) riskScore += 0; // normal
    else if (bmi < 30) riskScore += 30; // overweight
    else riskScore += 75; // obese

    // Blood Pressure scoring
    if (bloodPressure === 'normal') riskScore += 0;
    else if (bloodPressure === 'elevated') riskScore += 15;
    else if (bloodPressure === 'stage1') riskScore += 30;
    else if (bloodPressure === 'stage2') riskScore += 75;
    else if (bloodPressure === 'crisis') riskScore += 100;

    // Family history scoring
    if (familyHistory === 'diabetes' || familyHistory === 'cancer' || familyHistory === 'alzheimers') {
        riskScore += 10; // Each condition adds 10 points
    }

    // Determine the risk category
    let riskCategory = '';
    if (riskScore <= 20) riskCategory = 'Low Risk';
    else if (riskScore <= 50) riskCategory = 'Moderate Risk';
    else if (riskScore <= 75) riskCategory = 'High Risk';
    else riskCategory = 'Uninsurable';

    // Send the result
    res.json({
        riskCategory: riskCategory,
        score: riskScore
    });
});

// Starting the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
