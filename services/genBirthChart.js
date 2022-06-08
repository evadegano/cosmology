
export default async function genBirthChart(loggedUser, lang='en') {  
  // prep data for database
  let goals = localStorage.getItem('goals')
  goals = goals.split(',').map(goal => Number(goal))

  let gender = localStorage.getItem('gender')
  gender = gender.split(',')

  let birthLat = parseFloat(localStorage.getItem('birthLat'))
  let birthLong = parseFloat(localStorage.getItem('birthLong'))

  // store user data for db instance
  const user = {
    id: loggedUser.uid,
    goals,
    gender,
    lang: lang.toUpperCase(),
    birthDate: localStorage.getItem('birthDate'),
    birthTime: localStorage.getItem('birthTime'),
    birthLat,
    birthLong
  }

  const birthchart = {
    sunSign: localStorage.getItem('sunSign').toUpperCase(),
    moonSign: localStorage.getItem('moonSign').toUpperCase(),
    risingSign: localStorage.getItem('risingSign').toUpperCase(),
    northNode: localStorage.getItem('northNode').toUpperCase(),
    southNode: localStorage.getItem('southNode').toUpperCase(),
    venus: localStorage.getItem('venus').toUpperCase(),
  }

  console.log("user", user)
  console.log("birthchart", birthchart)

  // add user to database
  const userRes = await fetch('api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ user, birthchart }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const userData = await userRes.json()
  console.log("userData", userData)

  // return if error
  if (userData.message) {
    return userData.message
  }
}