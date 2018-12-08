
const util = require('util')
const {inspect} = util

const logCircularJson = (json) => inspect(json)

module.exports = {logCircularJson}
