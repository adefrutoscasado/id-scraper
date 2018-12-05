const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const moment = require('moment')
const adapter = new FileSync('db.json')
const db = low(adapter)


const setDefaults = () => {
  return db.defaults(
    {
      'url': '',
      'subscribers': [
        {
          'email': '',
          'notificationLog': []
        }
      ],
      'scraperLog': []
    }
  ).write()
}

const insertScraperLog = (data) => {
  return db.get('scraperLog')
    .push({
      time: moment().toISOString(),
      data: data
    })
    .write()
}

const getScraperLog = () => {
  return db.get('scraperLog')
    .value()
}

const insertNotificationLog = (email) => {
  return db.get('subscribers')
    .find({ email: email })
    .get('notificationLog')
    .push({
      time: moment().toISOString()
    })
    .write()
}

const getNotificationLog = (email) => {
  return db.get('subscribers')
    .find({ email: email })
    .get('notificationLog')
    .value()
}

const selectUrl = () => {
  return db.get('url')
    .value()
}

const selectSubscribers = () => {
  return db.get('subscribers')
    .value()
}

module.exports = {
  setDefaults,
  insertScraperLog,
  getScraperLog,
  insertNotificationLog,
  getNotificationLog,
  selectUrl,
  selectSubscribers
}
