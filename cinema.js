const { getBody } = require('./scrape')
const axios = require('axios')
/**
 * Here I fetch the title day and id for the movies then makes it lowercase and seperate time
 * with substring.
 *
 * @returns {object} Returning days movie and time.
 */

const fetchMovies = async (day, title, uri) => axios.get(uri).then(res => {
  const returningDayAndMovie = []
  res.data.forEach(time => {
    if (time.status === 1) {
      returningDayAndMovie.push({
        title,
        day: day.toLowerCase(),
        time: time.time.substring(0, 5),
        movie: time.movie.substring(0, 2)
      })
    }
  })

  return returningDayAndMovie
})

/**
 * Goes through the movies and days and returns the avaible movies.
 *
 * @param {string} url Url.
 * @returns {object} Returning avaiable days movie and time.
 */
const getMovies = async (url) => {
  let day = ''
  let availableMovies = []
  const body = await getBody(url)
  const days = Array.from(body.querySelectorAll('#day option'))
    .filter(option => !option.disabled)
    .map(option => ({ id: option.value, day: option.textContent }))

  const movies = Array.from(body.querySelectorAll('#movie option'))
    .filter(option => !option.disabled)
    .map(option => ({ id: option.value, title: option.textContent }))

  for (let i = 0; i < days.length; i++) {
    if (days[i].day === 'Friday') {
      day = '05'
    } else if (days[i].day === 'Saturday') {
      day = '06'
    } else if (days[i].day === 'Sunday') {
      day = '07'
    }

    for (let j = 1; j < movies.length; j++) {
      let movie = movies[j].title
      if (movies[j].title === 'The Flying Deuces') {
        movie = '01'
      } else if (movies[j].title === 'Keep Your Seats, Please') {
        movie = '02'
      } else if (movies[j].title === 'A Day at the Races') {
        movie = '03'
      }
      const uri = `${url}/check?day=${day}&movie=${movie}`
      availableMovies = availableMovies.concat(await fetchMovies(days[i].day, movies[j].title, uri))
    }
  }
  return availableMovies
}
console.log('Scraping showtimes...OK')

module.exports.getMovies = getMovies
