const {commandPrompt} = require('./../helpers/commandPrompt')
let subscriber = require('./../models/database/subscribers')
let databaseService = require('./../services/databaseService')

databaseService.mongoConnect();

(async () => {
  try {
    console.log('Introduce your email to subscribe to changes\n')
    let {email} = await commandPrompt(['email'])
    let result = await subscriber.insert(email)
    if (result) console.log('Success!')
  } catch (err) {
    throw new Error(err)
  }
  process.exit(0)
})()
