import Autocomplete from 'react-google-autocomplete'
import { useContext } from 'react'
import { Context } from '../../context'
import genBirthChart from '../../services/genBirthChart'
import utilsStyles from '../../styles/utils.module.css'
import styles from '../../styles/UserForm.module.css'


export default function StepBirthday({ next }) {
  const { lang, userForm, setUserForm, setBirthchart, errorMsg, setErrorMsg } = useContext(Context)
  
  const handleSubmit = (event) => {
    // prevent window from reloading
    event.preventDefault()

    const { birthDate, birthTime, birthLoc } = userForm

    // make sure all fields have been filled in
    if (!birthDate || !birthTime || !birthLoc) {
      setErrorMsg("Please fill in all fields.")
    }
    
    // parse birthday and birthtime
    const [birthYear, birthMonth, birthDay] = birthDate.split("-").map(el => Number(el))
    const [birthHour, birthMin] = birthTime.split(":").map(el => Number(el))

    // turn birth location into latitude and longitude
    birthLoc = birthLoc.toLowerCase()
    let lat, long

    fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.NEXT_PUBLIC_POSITION_STACK_KEY}&query=${birthLoc}`)
      .then(promise => promise.json())
      .then(res => {
        const { latitude, longitude } = res.data[0]

        lat = latitude
        long = longitude

        // make sure that lat and long 
        if (lat === undefined || long === undefined) {
          setErrorMsg("We're sorry but we couldn't find your city. Please make sure it was written correctly.")
          return
        }

        // update user state
        setUserForm(prev => ({
          ...prev, birthLat: lat, birthLong: long
        }))
      })
      .catch(err => setErrorMsg(err.message))

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

    // go to next form step
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
      <h1 className={utilsStyles.serif}>Tell us more about your birthday</h1>
      <p className={utilsStyles.subtitle + " " + utilsStyles.serif}>It’s not law but your birth sign will help us get real specific</p>

      <form onSubmit={handleSubmit}>
        <p id={styles.birthdayForm}>
          I was born on <input type='date' name='birthDate' value={userForm.birthDate} onChange={handleChange} required />
          &nbsp;at <input type='time' name='birthTime' value={userForm.birthTime} onChange={handleChange} required />
          &nbsp;in <input id='autocomplete' type='text' name='birthLoc' placeholder='city, country' value={userForm.birthLoc} onChange={handleChange} required />
        </p>

        <button className={utilsStyles.mainBtn} type="submit">Next</button>

        {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}
      </form>
    </div>
  )
}