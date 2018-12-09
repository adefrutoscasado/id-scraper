const {commandPrompt} = require('./../helpers/commandPrompt')
let scraper = require('./../models/database/scraper')
let databaseService = require('./../services/databaseService')

databaseService.mongoConnect();

(async () => {
  try {
    console.log('Introduce the url to scrape\n')
    let {url} = await commandPrompt(['url'])
    let result = await scraper.insert(url)
    if (result) console.log('Success!')
  } catch (err) {
    throw new Error(err)
  }
  process.exit(0)
})()
