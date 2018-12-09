const mongoose = require('mongoose')
const {Schema, Model} = mongoose
const moment = require('moment')
const {removeDuplicates} = require('./../../helpers/array')

const ScraperLogSchema = new Schema(
  {
    data: { type: Array, required: true }
  },
  { timestamps: true,
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
)

class ScraperLogModel extends Model {
  static getAll() {
    return this.find({})
  }
  static insert(data) {
    let scraperLog = new this()
    scraperLog.data = data
    return scraperLog.save() // returns a promise
  }
  static async getLast() {
    return (await this.find({}).sort('-createdAt').limit(1))[0]
  }
  static getLastElementsByTime(daysAgo) {
    let now = moment().toDate()
    let previousDay = moment().subtract(daysAgo, 'day').toDate()
    return this.find({
      createdAt: {
        $gte: previousDay,
        $lt: now
      }
    })
  }

/**
 * @param {integer} daysAgo Retrieve all the data from the moment is called to given days
 * @param {string} timeFilter Would filter and organize data by the expression. Use moment format. For daily filter, use 'DD-MM-YYYY'. For hourly filter, use 'DD-MM-YYYY hh'
 * 
 * @return {object} Returns filtered days and found data values {{'DD-MM-YYYY'}:['value1', 'value2']}
 */
  static async getMergedTimeline(daysAgo = 10, timeFilter = 'DD-MM-YYYY') {
    let lastElements = await this.getLastElementsByTime(daysAgo)
    let timeline = {}

    lastElements.forEach((scraperLog) => {
      let key = moment(scraperLog.createdAt).format(timeFilter)
      timeline[key] = []
      scraperLog.data.forEach(data => {
        timeline[key].push(data)
      })
      timeline[key] = removeDuplicates(timeline[key])
    })

    return timeline
  }
}

ScraperLogSchema.loadClass(ScraperLogModel)
let ScraperLog = mongoose.model('scraperLogs', ScraperLogSchema)

module.exports = ScraperLog
