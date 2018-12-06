const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const randomNumberInRange = (min, max) => {
  let randomNumber = Math.random() * (max - min) + min
  console.log(`Waiting ${randomNumber}...`)
  return Math.floor(randomNumber)
}

// warning this is set to use 1 second
const randomSleep = async () => {
  await timeout(1000 * randomNumberInRange(3, 4))
}

module.exports = {
  randomSleep
}
