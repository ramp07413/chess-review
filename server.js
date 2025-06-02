// server.js
const express = require('express');
// const { openChessLink } = require('./puppeteerHelper');
const { scarp } = require('./scarp')

const app = express();

app.get('/open-review', async (req, res) => {
  const { url } = req.query;

  if (!url) return res.status(400).send("❌ URL is required");

  try {
    await scarp(url);
    res.send("✅ Review link opened in browser with login");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error opening link");
  }
});

app.listen(4000, () => {
  console.log("🚀 Server running on http://localhost:4000");
});
