const mongoose = require('mongoose')
const mongoConnect = () => mongoose.connect('mongodb://localhost:27017')

// TODO: Unify expressions get/select
module.exports = {
  mongoConnect
}
