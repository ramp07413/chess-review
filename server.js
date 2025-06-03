const express = require('express');
const { openChessLink } = require('./puppeteerHelper');

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/open-review', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("❌ URL is required");

  try {
    const screenshot = await openChessLink(url);
    res.set('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).send("❌ Error opening link");
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
