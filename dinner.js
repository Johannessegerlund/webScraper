'use strict'

const { JSDOM } = require('jsdom')
const nodeFetch = require('node-fetch')
const fetchCookie = require('fetch-cookie/node-fetch')(nodeFetch)

/**
 *Använder mig av fetchcookies för att hanter inloggning på sidan. Sedan skrapar jag sidan
 * och gör om radio knapparna till värden, sedan gör jag om värdena till läsbar text och siffror.
 *
 * @param {Function} getDinner
 */

const getDinner = async (url) => {
  console.log(url)
  const res = await fetchCookie(url + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'username=zeke&password=coys&submit=login'
  })

  const html = await res.text()
  const body = new JSDOM(html).window.document.body
  // const alsoValues = Array.from(body.querySelectorAll('input[type=radio]')).map(radioButton => radioButton.value)
  const radioButtons = Array.from(body.querySelectorAll('input[type=radio]'))

  const bookings = []

  for (let i = 0; i < radioButtons.length; i++) {
    const booking = {
      day: radioButtons[i].value.substring(0, 3),
      startTime: radioButtons[i].value.substring(3, 5),
      endTime: radioButtons[i].value.substring(5)
    }

    bookings.push(booking)
  }

  return bookings
}

module.exports = { getDinner }
