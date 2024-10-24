const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());

const API_URL = process.env.API_URL;
const ACCESS_KEY = process.env.API_ACCESS_KEY;

app.get('/api/photos', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/photos`, {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
      params: {
        query: req.query.query || 'nature', 
        per_page: 10,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Unsplash API:', error);
    res.status(500).json({ error: 'Error fetching Unsplash API.' });
  }
});

// app.get('/', (req, res) => {
//   res.send('Test!');
// });

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}.`);
});
