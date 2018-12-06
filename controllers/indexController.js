const asyncUtil = require("../services/asyncService")
const databaseService = require("../services/databaseService")

module.exports = {
  index: asyncUtil(async (req, res, next) => {
    console.log('holi')
    res.render("index", {
      title: 'title'
    })
  })
}
