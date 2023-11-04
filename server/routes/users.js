const express = require('express');
const router = express.Router();
const Itinerary = require('./model');

// GET /itineraries
router.get('/itineraries', async (req, res) => {
  try {
    const { budget, days } = req.query;

    const itineraries = await Itinerary.find({
      budget: { $lte: budget },
      days: { $lte: days }
    });

    res.json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
