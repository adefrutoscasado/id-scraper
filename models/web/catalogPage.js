const Webpage = require('./webpage.js')
const { PRODUCT_ID_SELECTOR } = require('./../../constants/catalog')
const item = require('./../database/item')

class CatalogPage extends Webpage {
  constructor(page) {
    super()
    this.page = page
  }

  async getProductsId() {
    let selector = PRODUCT_ID_SELECTOR
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

  async screenshotProduct(productId, saveImage = false) {
    let selector = PRODUCT_ID_SELECTOR
    let screenshot = await this.screenshotDOMElement(`[${selector}='${productId}']`)
    if (saveImage) await item.upsert(productId, screenshot)
    return screenshot
  }
}

module.exports = CatalogPage
