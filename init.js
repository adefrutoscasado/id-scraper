const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017')
let Scraper = require('./models/database/scraper')
let Subscribers = require('./models/database/subscribers');

// const scraper = new Scraper();
// const subscribers = new Subscribers();

(async () => {
  try {
    // let result2 = await scraper.getAll()
    // console.log('result2')
    // console.log(result2)
    let result = await Scraper.insert('hjisfiuhsfiushgifeshguifg')
    console.log(result)
    // let result = await Scraper.save('ajdfshjgkj')
    // console.log(Scraper)
    // console.log(Subscribers)
    // let result2 = await subscribers.insert('email@mail.com')
    let result1 = await Scraper.getLast()
    console.log(result1)
    // let result2 = await subscribers.insertNotificationLog(email)
    // console.log(result2)
  } catch (err) {
    throw new Error(err)
  }
})()
