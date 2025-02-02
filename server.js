const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/translate', async (req, res) => {
  try {
    const { text, sourceLang, targetLang } = req.body;
    const response = await axios.post('https://translation.googleapis.com/language/translate/v2', {
      q: text,
      source: sourceLang,
      target: targetLang,
      key: 'YOUR_GOOGLE_API_KEY',
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Translation failed');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
