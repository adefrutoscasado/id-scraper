const puppeteer = require('puppeteer')
const emailService = require('./services/emailService')
const databaseService = require('./services/databaseService')
const CatalogPage = require('./models/web/catalogPage')
const {randomSleep} = require('./helpers/randomTime')

if (!process.env.API_SG_KEY) {
  throw new Error(
    'API_SG_KEY not found. Please use "API_SG_KEY={{Your_sendGrid_api_key}} node scraper.js"'
  )
}

databaseService.setDefaults();

(async () => {
  let browser
  let page
  try {
    browser = await puppeteer.launch({args: ['--no-sandbox']}) // https://github.com/Googlechrome/puppeteer/issues/290
    page = await browser.newPage()
  } catch (err) {
    console.error(err)
    throw new Error('Error loading webpage')
  }

  try {
    let catalogPage = new CatalogPage(page)
    await catalogPage.setViewPort(1920, 1080)
    await catalogPage.goTo(databaseService.selectUrl())
    await randomSleep()

    let products = await catalogPage.getProductsId()

    await Promise.all(products.map(async productId =>
      catalogPage.screenshotProduct(productId)
    ))

    console.log(products)
    let subscribers = databaseService.selectSubscribers()
    console.log(subscribers)

    subscribers.map((subscriber) => emailService.notificateChanges(subscriber.email, JSON.stringify(products), products))

    databaseService.insertScraperLog(products)
  } catch (err) {
    throw new Error(err)
  }

  await browser.close()
})()
