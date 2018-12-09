const asyncUtil = require('../services/asyncService')
const Scraper = require('./../models/database/scraper')
const Subscriber = require('./../models/database/subscribers')
const ScraperLog = require('./../models/database/scraperLog')
const Item = require('./../models/database/item')
const {logCircularJson} = require('./../helpers/logCircularJson')

module.exports = {
  index: asyncUtil(async (req, res, next) => {
    let url = await Scraper.getUrl()
    let timeline = await ScraperLog.getMergedTimeline()
    let subscribers = await Subscriber.getAll()
    let items = await Item.getAll()
    res.render('index', {
      title: 'Amazon scraper',
      url,
      timeline,
      subscribers,
      items
    })
  })
}
