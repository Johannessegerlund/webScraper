const { getBody, getLinks } = require('./scrape')
/**
 * Here I fetch the days and checks so its avaible.
 *
 * @param {string} url Url.
 */
const getUserCalendar = async url => {
  const body = await getBody(url)
  return Array.from(body.querySelectorAll('td'))
    .map(element => element.textContent.toLowerCase())
}

const getAvailableDays = async url => {
  const links = await getLinks(url)

  const userCalenders = await Promise.all(
    links
      .map(link => url + link)
      .map(getUserCalendar)
  )

  const availableDays = []

  if (userCalenders[0][0] === 'ok' && userCalenders[1][0] === 'ok' && userCalenders[2][0] === 'ok') {
    availableDays.push('friday')
  } if (userCalenders[0][1] === 'ok' && userCalenders[1][1] === 'ok' && userCalenders[2][1] === 'ok') {
    availableDays.push('saturday')
  } if (userCalenders[0][2] === 'ok' && userCalenders[1][2] === 'ok' && userCalenders[2][2] === 'ok') {
    availableDays.push('sunday')
  }

  return availableDays
}
console.log('Scraping available days...OK')

module.exports.getAvailableDays = getAvailableDays
