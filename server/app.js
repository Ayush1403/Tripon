const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://ayushsrivastava03004:Ayush23@cluster0.qamyfbt.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

app.use(express.json());

// Mount the router
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
