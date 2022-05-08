import { Origin, Horoscope } from 'circular-natal-horoscope-js'


export default function genBirthChart(year, month, day, hour, min, latitude, longitude) {  
  // create origin instance from user data
  const origin = new Origin({
    year: year,
    month: month - 1, // 0 = January, 11 = December!
    date: day,
    hour: hour,
    minute: min,
    latitude: latitude,
    longitude: longitude,
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