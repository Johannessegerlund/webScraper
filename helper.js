
// const flatten = xxs => xxs.reduce((xs, x) => Array.isArray(x) ? xs.concat(flatten(x)) : xs.concat(x), [])

/**
 * @param arrOrArr
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
 * @param days
 * @param movies
 * @param resturants
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
