import { Origin, Horoscope } from 'circular-natal-horoscope-js'


// get latitude and longitude of city and country
function getGeocode(location) {
  fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.NEXT_PUBLIC_POSITION_STACK_KEY}&query=${location}`)
    .then(promise => promise.json())
    .then(res => {
      const { latitude, longitude } = res.data[0]
      return { latitude, longitude }
    })
    .catch(err => err)
}

export default function genBirthChart(year, month, date, hour, min, location) {
  // get latitude and longitude of location
  const geocode = getGeocode(location)
  
  // create origin instance from user data
  const origin = new Origin({
    year: year,
    month: month - 1, // 0 = January, 11 = December!
    date: date,
    hour: hour,
    minute: min,
    latitude: geocode.latitude,
    longitude: geocode.longitude,
  });

  // create birth chart from origin
  const horoscope = new Horoscope({
    origin: origin,
    houseSystem: 'whole-sign',
    zodiac: 'tropical',
    aspectPoints: ['bodies', 'moon', 'sun'],
    aspectWithPoints: ['bodies', 'moon'],
    aspectTypes: [],
    customOrbs: {},
    language: 'en',
  });

  console.log("horoscope", horoscope)

  const userChart = {
    sunSign: horoscope.CelestialBodies.sun.Sign.label,
    moonSign: horoscope.CelestialBodies.moon.Sign.label,
    risingSign: horoscope._ascendant.Sign.label,
  }

  return userChart
}