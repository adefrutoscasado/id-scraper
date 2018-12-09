const prompt = require('prompt')


let commandPrompt = (params) => new Promise((resolve, reject) => {
  prompt.start()
  prompt.get(params, (err, result) => {
    if (err) reject()
    resolve(result)
  })
})

module.exports = {commandPrompt}
