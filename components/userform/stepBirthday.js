import Autocomplete from 'react-google-autocomplete'
import getGeocode from '../../services/getGeocode'
import genBirthChart from '../../services/genBirthChart'
import { Formik, Form, Field, ErrorMessage } from "formik"
import utilsStyles from '../../styles/utils.module.css'


export default function StepBirthday({ userForm, next, setUserForm, setBirthchart }) {
  const handleSubmit = (event) => {
    event.preventDefault()

    const { birthDate, birthTime, birthLoc } = userForm
    
    // parse birthday and birthtime
    const [birthYear, birthMonth, birthDay] = birthDate.split("-").map(el => Number(el))
    const [birthHour, birthMin] = birthTime.split(":").map(el => Number(el))

    let lat, long

    fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.NEXT_PUBLIC_POSITION_STACK_KEY}&query=${birthLoc}`)
      .then(promise => promise.json())
      .then(res => {
        const { latitude, longitude } = res.data[0]

        lat = latitude
        long = longitude

        // update user state
        setUserForm(prev => ({
          ...prev, birthLat: lat, birthLong: long
        }))
      })
      .catch(err => err)

    // get birth location geocode
    const geocode = getGeocode(birthLoc)

    console.log("geocode", geocode);

    // get zodiac signs
    const birthChart = genBirthChart(birthYear, birthMonth, birthDay, birthHour, birthMin, lat, long)

    // update birthchart state
    setBirthchart(prev => ({
      ...prev,
      sunSign: birthChart.sunSign,
      moonSign: birthChart.moonSign,
      risingSign: birthChart.risingSign,
      northNode: birthChart.northNode,
      southNode: birthChart.southNode,
      venus: birthChart.venus
    }))

    next()
  }

  const handleChange = (event) => {
    const { name, value }  = event.target

    switch (name) {
      case 'birthDate':
        setUserForm(prev => ({ ...prev, birthDate: value }))
        break
      case 'birthTime':
        setUserForm(prev => ({ ...prev, birthTime: value }))
        break
      case 'birthLoc':
        setUserForm(prev => ({ ...prev, birthLoc: value }))
        break
      default:
        break
    }
  }

  return (
    <div>
      <h1>Tell us more about your birthday</h1>
      <p>It’s not law but your birth sign will help us get real specific</p>

      <form onSubmit={handleSubmit}>
        <span>
          I was born on <input type='date' name='birthDate' value={userForm.birthDate} onChange={handleChange} required /> 
          at <input type='time' name='birthTime' value={userForm.birthTime} onChange={handleChange} required />
          in <input id='autocomplete' type='text' name='birthLoc' value={userForm.birthLoc} onChange={handleChange} required />
        </span>

        <button className={utilsStyles.mainBtn} type="submit">Next</button>
      </form>
    </div>
  )
}