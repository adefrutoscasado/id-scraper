const Webpage = require('./Webpage.js')
const CONSTANTS = require('./../CONSTANTS/CATALOG')

class CatalogPage extends Webpage {
  constructor(page) {
    super()
    this.page = page
  }

  async getProductsId() {
    let selector = CONSTANTS.PRODUCT_ID_SELECTOR
    try {
      return await this.page.evaluate(({selector}) => {
        let data = []
        let elements = document.querySelectorAll(`[${selector}]`)
        for (let element of elements) data.push(element.getAttribute(`${selector}`))
        return data
      }, {selector})
    } catch (err) {
      throw new Error(`Unable to get products Id using selector ${selector}`)
    }
  }

  async screenshotProduct(productId) {
    let selector = CONSTANTS.PRODUCT_ID_SELECTOR
    await this.screenshotDOMElement(`[${selector}='${productId}']`, `./screenshots/products/${productId}.png`)
  }

}

module.exports = CatalogPage
