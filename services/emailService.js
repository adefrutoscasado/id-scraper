const sgMail = require('@sendgrid/mail');
const databaseService = require('./databaseService');
const API_KEY = process.env.API_SG_KEY;

const sendMail = (recipient, text = 'This message contains no text') => {
  const msg = {
    to: recipient,
    from: 'puppeter-no-reply@puppeter.com',
    subject: 'Puppeter report',
    text: text,
    html: text
  };
  sgMail.setApiKey(API_KEY);
  sgMail.send(msg);
  databaseService.insertNotificationLog(recipient);
};

module.exports = {
  sendMail
};
