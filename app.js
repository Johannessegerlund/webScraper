const helper = require('./helper')
const scrape = require('./scrape')
const calender = require('./calender')
const cinema = require('./cinema')
const dinner = require('./dinner')

  /**
 * Använder mig av urln sedan får jag html sidorna.
 * Scrapar days för att plocka fram informationen om vilka dagar de är tillgängliga.
 * Sedan book events för att samanställa tider som passar angående film och resturang.
 *
 *@param {Function} days
 *@param {Function} movies
 *@param {Function} resturang
 */
// 'http://vhost3.lnu.se:20080/weekend'
;(async () => {
  const url = process.argv.slice(2)
  if (url.length === 0) {
    console.error('ERROR: No argument(s).')
    process.exit(0)
  }
  const [calendarURL, cinemaURL, dinnerURL] = await scrape.getLinks(url)
  const days = await calender.getAvailableDays(calendarURL)

  const movies = await cinema.getMovies(cinemaURL)

  const resturant = await dinner.getDinner(dinnerURL)

  const bookEvents = await helper.booking(days, movies, resturant)
  console.log(bookEvents)
})()
