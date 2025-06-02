const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

async function startBrowser() {
  let browser;
  try {
    console.log("🚀 Opening the browser in headless mode...");
    
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath || '/usr/bin/chromium-browser',
      headless: true,
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
    );

    console.log("✅ Headless browser and page setup complete");
    return { browser, page };

  } catch (err) {
    console.error("❌ Could not create a browser instance =>", err);
    return null;
  }
}

module.exports = { startBrowser };
