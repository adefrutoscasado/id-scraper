const asyncUtil = require('../services/asyncService')
const Scraper = require('./../models/database/scraper')
const Subscriber = require('./../models/database/subscribers')
const ScraperLog = require('./../models/database/scraperLog')
const {logCircularJson} = require('./../helpers/logCircularJson')

module.exports = {
  index: asyncUtil(async (req, res, next) => {
    let url = await Scraper.getUrl()
    let scraperLog = await ScraperLog.getAll()
    let subscribers = await Subscriber.getAll()

    res.render('index', {
      title: 'Amazon scraper',
      url,
      scraperLog,
      subscribers
    })
  })
}
