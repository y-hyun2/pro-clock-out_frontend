const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(express.json());

app.get('/api/random-message', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: 'Generate a random motivational message within 20 characters.',
        max_tokens: 30,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const message = response.data.choices[0].text.trim();
    res.json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating message');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
