const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const moment = require('moment')
const adapter = new FileSync('db.json')
const db = low(adapter)

const mongoose = require('mongoose')
const mongoConnect = () => mongoose.connect('mongodb://localhost:27017')

// TODO: Unify expressions get/select
module.exports = {
  mongoConnect
}
