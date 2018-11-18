const puppeteer = require('puppeteer');

const emailService = require('./services/emailService');
const databaseService = require('./services/databaseService');

if (!process.env.API_SG_KEY) {
  throw new Error(
    'API_SG_KEY not found. Please use "API_SG_KEY={{Your_sendGrid_api_key}} node app.js"'
  );
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomNumberInRange(min, max) {
  let randomNumber = Math.random() * (max - min) + min;
  console.log(`Waiting ${randomNumber}...`);
  return Math.floor(randomNumber);
}

const randomSleep = async () => {
  await timeout(1000 * randomNumberInRange(1, 1));
};

databaseService.setDefaults();

(async () => {
  let browser;
  let page;
  try {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(
      databaseService.selectUrl(),
      { waitUntil: 'networkidle2' }
    );
  } catch (err) {
    console.error('Error loading webpage');
    console.error(err);
    throw new Error('Error loading webpage');
  }

  try {
    // await page.addScriptTag({
    //   url: 'https://code.jquery.com/jquery-3.3.1.slim.min.js'
    // });

    await randomSleep();
    console.log('click cookies');
    try {
      await page.click('#cookies-acceptance');
    } catch (err) {
      console.log('No cookies acceptance button id found. Continue')
    }

    await randomSleep();
    console.log('despues timeout');
    await page.click('#start-purchase-process-desktop');

    console.log('despues timeout');
    await randomSleep();

    let availableSessions = await page.evaluate(() => {
      let data = [];
      let elements = document.getElementsByClassName('hasSession');
      for (let element of elements) data.push(element.textContent);
      return data;
    });

    console.log(availableSessions);
    let subscribers = databaseService.selectSubscribers();
    console.log(subscribers);

    subscribers.map((subscriber) => emailService.notificateChanges(subscriber.email, JSON.stringify(availableSessions), availableSessions));

    await page.screenshot({ path: `./screenshots/screenshot.png` });
    databaseService.insertScraperLog(availableSessions);
  } catch (err) {
    console.log(err);
  }
  await browser.close();
})();
