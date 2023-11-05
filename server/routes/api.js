const express = require('express');
const bodyParser = require('body-parser');
const { TextServiceClient } = require('@google-ai/generativelanguage');
const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');

const MODEL_NAME = "models/text-bison-001";
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const router = express.Router();

router.post('/generate-itinerary', async (req, res) => {
  // Validate the user input
  const budget = req.body.budget;
  const people = req.body.people;
  const days = req.body.days;

  if (!budget || !people || !days) {
    return res.status(400).json({
      error: 'Missing required parameters: budget, people, and days',
    });
  }

  // Generate the itinerary
  try {
    const result = await client.generateText({
      model: MODEL_NAME,
      temperature: 0.7,
      candidateCount: 1,
      top_k: 40,
      top_p: 0.95,
      max_output_tokens: 1024,
      stop_sequences: [],
      safety_settings: [
        { category: 'HARM_CATEGORY_DEROGATORY', threshold: 1 },
        { category: 'HARM_CATEGORY_TOXICITY', threshold: 1 },
        { category: 'HARM_CATEGORY_VIOLENCE', threshold: 2 },
        { category: 'HARM_CATEGORY_SEXUAL', threshold: 2 },
        { category: 'HARM_CATEGORY_MEDICAL', threshold: 2 },
        { category: 'HARM_CATEGORY_DANGEROUS', threshold: 2 },
      ],
      prompt: {
        text: `My budget is ${budget} INR and the number of people are ${people} and the number of days are ${days}. Give me an itinerary of all national and international tourist spots.`,
      },
    });

    // Send the generated itinerary back to the user
    res.json(result.choices[0].text || 'Error generating itinerary');
  } catch (error) {
    // Handle any errors
    console.error(error);

    // Return an error response
    return res.status(500).json({
      error: 'An error occurred while generating the itinerary',
    });
  }
});

module.exports = router;
