const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  days: {
    type: Number,
    required: true
  },
  // Add more fields as needed
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;
