class Webpage {
  constructor(page) {
    this.page = page
    this.loadedJQuery = false
    this.loadedCanvas2Html = false
  }

  async setViewPort(width, height) {
    await this.page.setViewport({ width, height })
  }

  async goTo(url) {
    await this.page.goto(url, { waitUntil: 'networkidle2' })
    this.loadedJQuery = false
    this.loadedCanvas2Html = false
  }

  async screenshot(outputPath = `./screenshots/screenshot.png`) {
    await this.page.screenshot({ path: outputPath })
  }

  async loadJQuery() {
    if (!this.loadedJQuery) await this.page.addScriptTag({url: 'https://code.jquery.com/jquery-3.3.1.slim.min.js'})
    this.loadedJQuery = true
  }

  async loadCanvas2Html() {
    if (!this.loadedCanvas2Html) await this.page.addScriptTag({url: 'https://github.com/niklasvh/html2canvas/releases/download/v1.0.0-alpha.8/html2canvas.js'})
    this.loadedCanvas2Html = true
  }

  async screenshotDOMElement(selector, outputPath = './screenshots/DOMelement.png', padding = 0) {
    try {
      const rect = await this.page.evaluate(selector => {
        const element = document.querySelector(selector)
        const {x, y, width, height} = element.getBoundingClientRect()
        return {left: x, top: y, width, height, id: element.id}
      }, selector)

      return await this.page.screenshot({
        path: outputPath,
        clip: {
          x: rect.left - padding,
          y: rect.top - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2
        }
      })
    } catch (error) {
      throw new Error(`Unable to screenshot DOM element using selector ${selector}.\nError: ${error}`)
    }
  }

}

module.exports = Webpage
