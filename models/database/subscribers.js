const mongoose = require('mongoose')
const {Schema, Model} = mongoose

const NotificationLogSchema = new Schema(
  { },
  { timestamps: true }
)

const SubscribersSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'] },
    notification_log: [
      NotificationLogSchema
    ]
  },
  { timestamps: true }
)

SubscribersSchema.methods = {
  insert: async function (email) {
    this.email = email
    return this.save() // returns a promise
  },
  insertNotificationLog: async function (email) {
    return this.findOne({email})
  }
}

module.exports = mongoose.model('Subscribers', SubscribersSchema)
