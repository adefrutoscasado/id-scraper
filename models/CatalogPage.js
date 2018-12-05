const Webpage = require('./Webpage.js')
const CONSTANTS = require('./../CONSTANTS/CATALOG')

class CatalogPage extends Webpage {
  constructor(page) {
    super()
    this.page = page
  }

  async getProductsId() {
    await this.loadJQuery()
    let selector = CONSTANTS.PRODUCT_ID_SELECTOR
    return await this.page.evaluate(() => {
      document.getElementById('footer').querySelectorAll('[data-asin]')
      // `let data = []
      // let elements = $("[data-asin]")
      // for (let element of elements) data.push(element.textContent)
      // return data`
    })
  }
}

module.exports = CatalogPage
