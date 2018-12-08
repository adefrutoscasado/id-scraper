const mongoose = require('mongoose')
const {Schema, Model} = mongoose

const ScraperSchema = new Schema(
  {
    url: { type: String, required: true, maxlength: 1000 }
  },
  { timestamps: true }
)

class ScraperModel extends Model {
  static getAll() {
    return this.find({})
  }
  static insert(url) {
    let scraper = new this()
    scraper.url = url
    return scraper.save() // returns a promise
  }
  static async getLast() {
    return (await this.find({}).sort('-createdAt').limit(1))[0]
  }
}

ScraperSchema.loadClass(ScraperModel)
let Scraper = mongoose.model('scrapers', ScraperSchema)

module.exports = Scraper
