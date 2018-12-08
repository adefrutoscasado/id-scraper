const mongoose = require('mongoose')
const {Schema, Model} = mongoose

const ScraperLogSchema = new Schema(
  {
    data: { type: JSON, required: true }
  },
  { timestamps: true }
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
}

ScraperLogSchema.loadClass(ScraperLogModel)
let ScraperLog = mongoose.model('scraperLogs', ScraperLogSchema)

module.exports = ScraperLog
