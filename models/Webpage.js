class Webpage {
  constructor(page) {
    this.page = page
    this.loadedJQuery = false
  }

  async setViewPort(width, height) {
    await this.page.setViewport({ width, height })
  }

  async goTo(url) {
    await this.page.goto(url, { waitUntil: 'networkidle2' })
  }

  async screenshot() {
    await this.page.screenshot({ path: `./screenshots/screenshot.png` })
  }

  async loadJQuery() {
    if (!this.loadedJQuery) await this.page.addScriptTag({url: 'https://code.jquery.com/jquery-3.3.1.slim.min.js'})
    this.loadedJQuery = true
  }
}

module.exports = Webpage
