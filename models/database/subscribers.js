const mongoose = require('mongoose')
const {Schema, Model} = mongoose

const NotificationLogSchema = new Schema(
  { },
  { timestamps: true }
)

const SubscribersSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'] },
    notificationLog: [
      NotificationLogSchema
    ]
  },
  { timestamps: true }
)

class SubscriberModel extends Model {
  static getAll() {
    return this.find({})
  }
  static insert(email) {
    let scraper = new this()
    scraper.email = email
    return scraper.save() // returns a promise
  }
  static async insertNotificationLog(email) {
    return this.findOneAndUpdate({email}, {$push: {notificationLog: {}}})
  }
  static async getNotificationLog(email) {
    return (await this.findOne({email})).notificationLog
  }
}

SubscribersSchema.loadClass(SubscriberModel)
let Subscriber = mongoose.model('subscribers', SubscribersSchema)

module.exports = Subscriber
