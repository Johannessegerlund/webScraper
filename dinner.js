'use strict'
const { JSDOM } = require('jsdom')
const nodeFetch = require('node-fetch')
const fetchCookie = require('fetch-cookie/node-fetch')(nodeFetch)

/**
 * Using fetchcookie and as a post I login to the site and make it readable with jsdom .
 * After that I then scrape the radio buttons info and seperate with substring.
 *
 * @param {string} url Url.
 */

const getDinner = async (url) => {
  const res = await fetchCookie(url + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'username=zeke&password=coys&submit=login'
  })

  const html = await res.text()
  const body = new JSDOM(html).window.document.body
  const radioButtons = Array.from(body.querySelectorAll('input[type=radio]'))

  const bookings = []
  for (let i = 0; i < radioButtons.length; i++) {
    const booking = {
      day: radioButtons[i].value.substring(0, 3),
      startTime: radioButtons[i].value.substring(3, 5),
      endTime: radioButtons[i].value.substring(5)
    }
    if (booking.startTime.length === 2) {
      booking.startTime += ':00'
    }
    if (booking.endTime.length === 2) {
      booking.endTime += ':00'
    }

    bookings.push(booking)
  }

  return bookings
}
console.log('Scraping possible reservations...OK')
module.exports = { getDinner }
