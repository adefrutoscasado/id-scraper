const _ = require('underscore')

// Compare array content despite order
let arrayContentEqual = (arrayA, arrayB) => _.isEqual(arrayA.sort(), arrayB.sort())

let removeDuplicates = (array, property) => _.uniq(array, property)

module.exports = {
  arrayContentEqual,
  removeDuplicates
}
