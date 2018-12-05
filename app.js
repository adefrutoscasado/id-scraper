const puppeteer = require('puppeteer')
const emailService = require('./services/emailService')
const databaseService = require('./services/databaseService')
const CatalogPage = require('./models/CatalogPage')
const {randomSleep} = require('./helpers/randomTime')

if (!process.env.API_SG_KEY) {
  throw new Error(
    'API_SG_KEY not found. Please use "API_SG_KEY={{Your_sendGrid_api_key}} node app.js"'
  )
}

// databaseService.setDefaults()

(async () => {
  let browser
  let page
  try {
    browser = await puppeteer.launch()
    page = await browser.newPage()
  } catch (err) {
    console.error(err)
    throw new Error('Error loading webpage')
  }

  console.log('hola')
  let catalogPage = new CatalogPage(page)
  await catalogPage.setViewPort(1920, 1080)
  await catalogPage.goTo(databaseService.selectUrl())
  console.log('hola2')
  await randomSleep()
  console.log(await catalogPage.getProductsId())
  console.log('hola3')
  await randomSleep()
  await catalogPage.screenshot()
  console.log('hola4')

  // try {
    // await page.addScriptTag({
    //   url: 'https://code.jquery.com/jquery-3.3.1.slim.min.js'
    // })

    // await randomSleep()
    // console.log('click cookies')
    // try {
    //   await page.click('#cookies-acceptance')
    // } catch (err) {
    //   console.log('No cookies acceptance button id found. Continue')
    // }

    // await randomSleep()
    // console.log('despues timeout')
    // await page.click('#start-purchase-process-desktop')

    // console.log('despues timeout')
    // await randomSleep()

    // let availableSessions = await page.evaluate(() => {
    //   let data = []
    //   let elements = document.getElementsByClassName('hasSession')
    //   for (let element of elements) data.push(element.textContent)
    //   return data
    // })

    // console.log(availableSessions)
    // let subscribers = databaseService.selectSubscribers()
    // console.log(subscribers)

    // subscribers.map((subscriber) => emailService.notificateChanges(subscriber.email, JSON.stringify(availableSessions), availableSessions))

    // await page.screenshot({ path: `./screenshots/screenshot.png` })
    // databaseService.insertScraperLog(availableSessions)
  // } catch (err) {
  //   console.log(err)
  // }
  await browser.close()
})()
