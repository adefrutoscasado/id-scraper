const sgMail = require('@sendgrid/mail')
const moment = require('moment')
// const databaseService = require('./databaseService')
const {arrayContentEqual} = require('./../helpers/array')
const API_KEY = process.env.API_SG_KEY
const Subscriber = require('./../models/database/subscribers')
const ScraperLog = require('./../models/database/scraperLog')

const sendMail = async (recipient, text = 'This message contains no text') => {
  const msg = {
    to: recipient,
    from: 'puppeter-no-reply@puppeter.com',
    subject: 'Puppeter report',
    text: text,
    html: text
  }
  sgMail.setApiKey(API_KEY)
  // sgMail.send(msg)
  await Subscriber.insertNotificationLog(recipient)
  return true
}

const sendMailOnceADay = async (recipient, text = 'This message contains no text') => {
  let notificationLog = Subscriber.getNotificationLog(recipient)

  if (!notificationLog || !notificationLog.length) await sendMail(recipient, text)

  let lastNotificationLog = notificationLog[notificationLog.length - 1]
  if ((moment(lastNotificationLog)).isBefore(moment().subtract(1, 'day'))) await sendMail(recipient, text)
  return true
}

const notificateChanges = async (recipient, text = 'This message contains no text', data) => {
  console.log('notificateChanges')
  let lastScraperLog = await ScraperLog.getLast()

  console.log(lastScraperLog)

  // if its the first time scraping, send a notification
  if (!lastScraperLog) {
    console.log('first time scraping, send a notification')
    return await sendMail(recipient, `Scraper started for 1st time, data found: ${text}`)
  }

  if (arrayContentEqual(lastScraperLog.data, data)) {
    console.log('theres no change in data, send a notification once a day')
    await sendMailOnceADay(recipient, `Daily report, no changes detected in the data: ${text}`)
  } else {
    console.log('there is a change in data, send a notification inmediately')
    await sendMail(recipient, `There is a change in the data: ${text}`)
  }
  return true
}

module.exports = {
  sendMail,
  sendMailOnceADay,
  notificateChanges
}
