
/**
 * Flatten the array of movies etc (current).
 *
 * @param {Array} arrOrArr Array.
 * @returns {Array} A flatten array.
 */
function flatten (arrOrArr) {
  const flattenArr = []
  for (let i = 0; i < arrOrArr.length; i++) {
    const current = arrOrArr[i]

    if (Array.isArray(current)) {
      flattenArr.push(...flatten(current))
    } else {
      flattenArr.push(current)
    }
  }
  return flattenArr
}

/**
 * Returns a flatten array then filter it so it matches days, resturant and movie.
 *
 * @param {object} days Days.
 * @param {object} movies Movies.
 * @param {object} resturants Resturant.
 * @returns {Array} A flatten array.
 */
function booking (days, movies, resturants) {
  return flatten(
    days.map(day =>
      movies.filter(movie => movie.day === day)
        .map(movie =>
          resturants
            .filter(resturant => resturant.day === day.substring(0, 3))
            .filter(resturant => parseInt(resturant.startTime) >= parseInt(movie.time) + 2)
            .map(resturant => ({
              movieTitle: movie.title,
              movieStart: movie.time,
              resturantStart: resturant.startTime + '-' + resturant.endTime,
              day: day
            }))
        )
    )
  )
}

module.exports.booking = booking
