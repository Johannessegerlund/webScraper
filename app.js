const helper = require('./helper')
const scrape = require('./scrape')
const calender = require('./calender')
const cinema = require('./cinema')
const dinner = require('./dinner')

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

  const capitalizeFirstChar = str => str.charAt(0).toUpperCase() + str.substring(1)

  console.log('\n Recommendations \n ===============')
  console.log('* On ' + capitalizeFirstChar(bookEvents[0].day) + ' the movie ' + '"' + bookEvents[0].movieTitle + '"' + ' starts at ' + bookEvents[0].movieStart + ' and there is a free table between ' + bookEvents[0].resturantStart + '.')
  console.log('* On ' + capitalizeFirstChar(bookEvents[1].day) + ' the movie ' + '"' + bookEvents[1].movieTitle + '"' + ' starts at ' + bookEvents[1].movieStart + ' and there is a free table between ' + bookEvents[1].resturantStart + '.')
})()
