const express = require('express');
const itineraryRouter = require('./routes/api');
const axios = require('axios')

const app = express();

app.use('/itinerary', itineraryRouter);

app.listen(4000, () => {
  console.log('App listening on port 4000');
});

axios.get('/').then((response) => {
  console.log('Backend server is running');
}).catch((error) => {
  console.log('Backend server is not running');
});
