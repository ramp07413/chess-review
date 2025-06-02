const express = require('express');
const { openPageWithUserAgent } = require('./puppeteerHelper');

const app = express();

app.get('/open', async (req, res) => {
  const url = req.query.url || 'https://www.chess.com/';
  await openPageWithUserAgent(url);
  res.send("✅ Opened page with user agent");
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
