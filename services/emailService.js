const sgMail = require('@sendgrid/mail')
const moment = require('moment')
const databaseService = require('./databaseService')
const API_KEY = process.env.API_SG_KEY

const sendMail = (recipient, text = 'This message contains no text') => {
  const msg = {
    to: recipient,
    from: 'puppeter-no-reply@puppeter.com',
    subject: 'Puppeter report',
    text: text,
    html: text
  }
  sgMail.setApiKey(API_KEY)
  // sgMail.send(msg)
  databaseService.insertNotificationLog(recipient)
}

const sendMailOnceADay = (recipient, text = 'This message contains no text') => {
  let notificationLog = databaseService.getNotificationLog(recipient)

  if (!notificationLog || !notificationLog.length) sendMail(recipient, text)

  let lastNotificationLog = notificationLog[notificationLog.length - 1]
  if ((moment(lastNotificationLog)).isBefore(moment().subtract(1, 'day'))) sendMail(recipient, text)
}

const notificateChanges = (recipient, text = 'This message contains no text', data) => {
  console.log('notificateChanges')
  let scraperLog = databaseService.getScraperLog()

  // if its the first time scraping, send a notification
  if (!scraperLog || !scraperLog.length) {
    console.log('first time scraping, send a notification')
    return sendMail(recipient, text)
  }

  let lastScraperLog = scraperLog[scraperLog.length - 1]
  if (JSON.stringify(lastScraperLog.data) === JSON.stringify(data)) {
    console.log('theres no change in data, send a notification once a day')
    sendMailOnceADay(recipient, `Daily report, no changes detected in the data: ${text}`)
  } else {
    console.log('there is a change in data, send a notification inmediately')
    sendMail(recipient, `There is a change in the data: ${text}`)
  }
}

module.exports = {
  sendMail,
  sendMailOnceADay,
  notificateChanges
}
