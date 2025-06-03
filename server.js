const express = require('express');
const { openChessLink } = require('./puppeteerHelper');

const app = express();
const PORT = process.env.PORT || 4000; // ✅ Define PORT from env

app.get('/open-review', async (req, res) => {
  const { url } = req.query;

  if (!url) return res.status(400).send("❌ URL is required");

  try {
    await openChessLink(url);
    res.send("✅ Review link opened in browser with login");
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).send("❌ Error opening link");
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});