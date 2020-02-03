const jsdom = require('jsdom')
const { JSDOM } = jsdom

const fetch = require('node-fetch')

/**
 * Here I fetch the url and make it a readeble text with jsdom.
 *
 * @param {string} url Url.
 * @returns {object} Jsdom html object.
 */
const getBody = async url => {
  const result = await fetch(url)
  const html = await result.text()
  return new JSDOM(html).window.document.body
}

/**
 * Here I get the urls from getbody.
 *
 * @returns {Array} All href´s.
 * @param {string} url Url.
 */
const getLinks = async url => {
  const body = await getBody(url)
  return Array.from(body.querySelectorAll('a[href]'))
    .map(element => element.href)
}
console.log('Scraping links...OK')

module.exports.getLinks = getLinks
module.exports.getBody = getBody
