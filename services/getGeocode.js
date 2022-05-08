export default function getGeocode(location) {
  fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.NEXT_PUBLIC_POSITION_STACK_KEY}&query=${location}`)
    .then(promise => promise.json())
    .then(res => {
      const { latitude, longitude } = res.data[0]
      return { latitude, longitude }
    })
    .catch(err => err)
}