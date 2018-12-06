const asyncUtil = require('../services/asyncService')
const databaseService = require('../services/databaseService')

module.exports = {
  index: asyncUtil(async (req, res, next) => {
    let url = databaseService.selectUrl()
    let scraperLog = databaseService.getScraperLog()
    let subscribers = databaseService.selectSubscribers()
    res.render('index', {
      title: 'Amazon scraper',
      url,
      scraperLog,
      subscribers
    })
  })
}
