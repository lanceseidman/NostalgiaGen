const express = require('express');
const axios = require('axios');
const { OpenAI } = require('openai');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// OpenAI setup
const openai = new OpenAI({
  apiKey: '', // Replace with your OpenAI API key
});

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API endpoint to generate nostalgic content
app.post('/generate', async (req, res) => {
  const { year } = req.body;

  try {
    // Generate nostalgic text using OpenAI
    const prompt = `Create a nostalgic description of the year ${year}, including popular music, trends, and events.`;
    const completion = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: prompt,
      max_tokens: 150,
    });

    const nostalgicText = completion.choices[0].text;
    const apiKey = '';
    const musicResponse = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${year}&api_key=${apiKey}&format=json`); // Replace with a real API
    const track = musicResponse.data.tracks.track[0];
    
    // Send response to frontend
    res.json({
        text: track.name, 
        music: track.artist.name
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating content');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});