const axios = require('axios');

// GET /itineraries
router.get('/itineraries', async (req, res) => {
  try {
    const { budget, days } = req.query;

    // Make a request to the Bard AI API
    const response = await axios.get('https://api.bardai.com/itineraries', {
      params: {
        budget,
        days
      },
      headers: {
        Authorization: 'Bearer AIzaSyB-a81eiVhzqRJ_cEzpBD5WhYSTMfBMpHo' // Replace with your API key
      }
    });

    const itineraries = response.data;

    res.json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
