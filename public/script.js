document.getElementById('nostalgiaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const year = document.getElementById('year').value;
  
    try {
      const response = await fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year }),
      });
  
      const textData = await response.json();
  
      // Display nostalgic text
      document.getElementById('nostalgicText').textContent = textData.text;

      const lastFmApiKey = ''; // Replace with your Last.fm API key
      const lastFmUrl = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${year}&api_key=${lastFmApiKey}&format=json`;
      const musicResponse = await fetch(lastFmUrl);
      const musicData = await musicResponse.json();
  
      // Extract top track and artist
      const topTrack = musicData.tracks.track[0];
      const trackName = topTrack.name;
      const artistName = topTrack.artist.name;

      // Display music info
      document.getElementById('trackName').textContent = trackName;
      document.getElementById('artistName').textContent = artistName;

      // Show output section
      document.getElementById('output').style.display = 'block';
    } catch (error) {
      console.error(error);
      alert('Error generating content');
    }
  });