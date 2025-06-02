const puppeteer = require('puppeteer');
require("dotenv").config();

const scarp = async (res) => {
  try {
    const browser = await puppeteer.launch({
      args:[
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--single-process",
          "--no-zygote"
      ],
      executablePath:
          process.env.NODE_ENV === "production" ?
          process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });

    const page = await browser.newPage();

    await page.goto('https://developer.chrome.com/');

    await page.setViewport({width: 1080, height: 1024});

    // Puppeteer style to type in input field
    await page.type('input[aria-label="Search"]', 'automate beyond recorder');

    // Wait for and click the first result link
    await page.waitForSelector('.devsite-result-item-link');
    await page.click('.devsite-result-item-link');

    // Wait for the selector that contains the full title text
    await page.waitForSelector('h1'); // or more specific selector if needed

    // Get the text content of the element
    const fullTitle = await page.$eval('h1', el => el.textContent);

    console.log('The title of this blog post is "%s".', fullTitle);

    res.send(fullTitle);

    await browser.close();
  } catch (err) {
    console.error('Error in scraping:', err);
    res.status(500).send('Error in scraping');
  }
};

module.exports = { scarp };
