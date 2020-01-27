const jsdom = require('jsdom')
const { JSDOM } = jsdom

const fetch = require('node-fetch')
/**
 * Här fetchar jag url's och använder denna som min scrap funtion.
 *
 * @param {Function} getBody
 * @param url
 * @param {Function} getLinks
 */
const getBody = async url => {
  const result = await fetch(url)
  const html = await result.text()

  return new JSDOM(html).window.document.body
}

const getLinks = async url => {
  const body = await getBody(url)
  return Array.from(body.querySelectorAll('a[href]'))
    .map(element => element.href)
}

module.exports.getLinks = getLinks
module.exports.getBody = getBody
