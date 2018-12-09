const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'

const mongoose = require('mongoose')
const mongoConnect = () => mongoose.connect(MONGODB_URI)

// TODO: Unify expressions get/select
module.exports = {
  mongoConnect
}
