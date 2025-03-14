const express = require("express");
const router = express.Router();

// Function to calculate BMI
function calculateBMI(weight, height) {
  const heightMeters = height / 100; // Convert cm to meters
  return weight / (heightMeters * heightMeters);
}

// Function to determine risk score
function calculateRiskScore(age, weight, height, systolic, diastolic, diseases) {
  let score = 0;

  // Age-based scoring
  if (age < 30) score += 0;
  else if (age < 45) score += 10;
  else if (age < 60) score += 20;
  else score += 30;

  // BMI-based scoring
  const bmi = calculateBMI(weight, height);
  if (bmi < 25) score += 0;
  else if (bmi < 30) score += 30;
  else score += 75;

  // Blood pressure-based scoring
  if (systolic < 120 && diastolic < 80) score += 0;
  else if (systolic < 130 && diastolic < 80) score += 15;
  else if (systolic < 140 || diastolic < 90) score += 30;
  else if (systolic < 180 || diastolic < 120) score += 75;
  else score += 100;

  // Family history-based scoring
  diseases.forEach((disease) => {
    if (["diabetes", "cancer", "Alzheimer’s"].includes(disease.toLowerCase())) {
      score += 10;
    }
  });

  // Determine risk category
  let riskCategory = "Uninsurable";
  if (score <= 20) riskCategory = "Low Risk";
  else if (score <= 50) riskCategory = "Moderate Risk";
  else if (score <= 75) riskCategory = "High Risk";

  return { score, riskCategory };
}

// API Route for Risk Calculation
router.post("/calculate-risk", (req, res) => {
  const { age, weight, height, systolic, diastolic, diseases } = req.body;

  // Validate input
  if (!age || !weight || !height || !systolic || !diastolic || !diseases) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  if (height < 60) {
    return res.status(400).json({ error: "Height must be at least 60 cm!" });
  }

  const result = calculateRiskScore(age, weight, height, systolic, diastolic, diseases);
  res.json(result);
});

module.exports = router;
