const pkg = require('../package.json')
const { renderToStaticMarkup } = require('react-dom/server')

class Klotty {
  constructor(apiKey) {
    if (!apiKey) {
      throw 'Missing API key. Pass it to the constructor `new Klotty("kl_123")`'
    }

    this.apiKey = apiKey
    this.baseURL = 'https://api.klotty.com'
    this.headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'User-Agent': `node:${pkg.version}`,
      'Content-Type': 'application/json',
    }
  }

  async sendEmail(body = {}) {
    let react = ''

    if (body.react) {
      react = renderToStaticMarkup(body.react)
    }

    const req = await fetch(`${this.baseURL}/email`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        from: body.from,
        to: body.to,
        subject: body.subject,
        text: body.text,
        html: react || body.html,
      })
    })

    return await req.json()
  }
}

module.exports = Klotty