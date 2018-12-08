// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017')

let databaseService = require('./services/databaseService')
databaseService.mongoConnect()

let scraper = require('./models/database/scraper')
let subscriber = require('./models/database/subscribers');

// const scraper = new Scraper();
// const subscribers = new Subscribers();

(async () => {
  try {
    let result2 = await scraper.getAll()
    // console.log('result2')
    console.log(result2)
    // let result = await scraper.insert('hjisfiuhsfiushgifeshguifg')
    // console.log(result)
    // let result = await Scraper.save('ajdfshjgkj')
    // console.log(Scraper)
    // console.log(Subscribers)
    // let result2 = await subscriber.insert('email@mail.com')
    // let result1 = await subscriber.addNotificationLog('email@mail.com')
    // console.log(result1)
    // let result2 = await subscribers.insertNotificationLog(email)
    // console.log(result2)
  } catch (err) {
    throw new Error(err)
  }
})()
