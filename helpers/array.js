const _ = require('underscore')

// Compare array content despite order
let arrayContentEqual = (arrayA, arrayB) => _.isEqual(arrayA.sort(), arrayB.sort())

module.exports = {
  arrayContentEqual
}
