import Autocomplete from 'react-google-autocomplete'
import { useContext, useState, useEffect } from 'react'
import { Context } from '../../context'
import genBirthChart from '../../services/genBirthChart'
import utilsStyles from '../../styles/utils.module.css'
import styles from '../../styles/UserForm.module.css'


export default function StepBirthday({ next, firstLoad, setFirstLoad }) {
  const { lang, userForm, setUserForm, setBirthchart, errorMsg, setErrorMsg } = useContext(Context)

  useEffect(() => {
    if (firstLoad) {
      var birthDate = localStorage.getItem('birthDate')
      var birthTime = localStorage.getItem('birthTime')
      var birthLoc = localStorage.getItem('birthLoc')
    }

    // check if user birth data was already stored
    if (birthDate && birthTime && birthLoc) {
      setUserForm(prev => ({ ...prev, birthDate, birthTime, birthLoc }))
    }
  })
  
  const handleSubmit = (event) => {
    // prevent window from reloading
    event.preventDefault()

    const { birthDate, birthTime, birthLoc } = userForm

    // make sure all fields have been filled in
    if (!birthDate || !birthTime || !birthLoc) {
      setErrorMsg("Please fill in all fields.")
    }

    // update local storage
    localStorage.setItem('birthDate', birthDate)
    localStorage.setItem('birthTime', birthTime)
    localStorage.setItem('birthLoc', birthLoc)

    // parse birthday and birthtime
    const [birthYear, birthMonth, birthDay] = birthDate.split("-").map(el => Number(el))
    const [birthHour, birthMin] = birthTime.split(":").map(el => Number(el))

    // get birth location data
    const birthLat = localStorage.getItem('birthLat')
    const birthLong = localStorage.getItem('birthLong')
    let lat, long

    // get birth latitude and longitude from database if not stored yet
    if (!birthLat || !birthLong) {
      console.log("Calculating birth geocode...")
      // turn birth location into latitude and longitude
      birthLoc = birthLoc.toLowerCase()

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

        // update local storage
        localStorage.setItem('birthLat', lat)
        localStorage.setItem('birthLong', long)

        // update user state
        setUserForm(prev => ({
          ...prev, birthLat: lat, birthLong: long
        }))
      })
      .catch(err => setErrorMsg(err.message))
    }

    let sunSign = localStorage.getItem('sunSign')
    let moonSign = localStorage.getItem('moonSign')
    let risingSign = localStorage.getItem('risingSign')
    let northNode = localStorage.getItem('northNode')
    let southNode = localStorage.getItem('southNode')
    let venus = localStorage.getItem('venus')

    // calcuate zodiac signs if not already stored
    if (!sunSign || !moonSign || !risingSign || !northNode || !southNode || !venus) {
      console.log("Calculating birthchart...")
      const birthChart = genBirthChart(birthYear, birthMonth, birthDay, birthHour, birthMin, lat, long)

      sunSign = birthChart.sunSign
      moonSign = birthChart.moonSign
      risingSign = birthChart.risingSign
      northNode = birthChart.northNode
      southNode = birthChart.southNode
      venus = birthChart.venus

      // update local storage
      localStorage.setItem('sunSign', sunSign)
      localStorage.setItem('moonSign', moonSign)
      localStorage.setItem('risingSign', risingSign)
      localStorage.setItem('northNode', northNode)
      localStorage.setItem('southNode', southNode)
      localStorage.setItem('venus', venus)
    }
    
    // update birthchart state
    setBirthchart(prev => ({
      ...prev,
      sunSign,
      moonSign,
      risingSign,
      northNode,
      southNode,
      venus
    }))

    // go to next form step
    next()

    // reset first load state
    setFirstLoad(true)
  }

  const handleChange = (event) => {
    setFirstLoad(false)
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

  const resetBirthData = () => {
    localStorage.removeItem('birthDate')
    localStorage.removeItem('birthTime')
    localStorage.removeItem('birthLoc')
    localStorage.removeItem('birthLat')
    localStorage.removeItem('birthLong')
    localStorage.removeItem('sunSign')
    localStorage.removeItem('moonSign')
    localStorage.removeItem('risingSign')
    localStorage.removeItem('northNode')
    localStorage.removeItem('southNode')
    localStorage.removeItem('venus')

    setUserForm(prev => ({ ...prev, birthDate: '', birthTime: '', birthLoc: '', birthLat: '', birthLong: '' }))
  }

  return (
    <div>
      <h1>When is your birthdate?</h1>
      <p className={utilsStyles.subtitle + " " + utilsStyles.serif}>It&rsquo;s not law but your birth sign will help us get real specific</p>

      {
        firstLoad && userForm.birthDate && userForm.birthTime && userForm.birthLoc
        ? (
          <div>
            <p>
              Were you born on {userForm.birthDate} at {userForm.birthTime} in {userForm.birthLoc}?
            </p>

            <div className={utilsStyles.inline_centered}>
              <button className={utilsStyles.mainBtn} onClick={resetBirthData}>No</button>
              <button className={utilsStyles.mainBtn} onClick={handleSubmit}>Yes</button>
            </div>
          </div>
        )
        : (
          <form onSubmit={handleSubmit}>
            <p id={styles.birthdayForm}>
              I was born on <input type='date' name='birthDate' value={userForm.birthDate} onChange={handleChange} required />
              &nbsp;at <input type='time' name='birthTime' value={userForm.birthTime} onChange={handleChange} required />
              &nbsp;in <input id='autocomplete' type='text' name='birthLoc' placeholder='city, country' value={userForm.birthLoc} onChange={handleChange} required />
            </p>

            <button className={utilsStyles.mainBtn} type="submit">Next</button>

            {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}
          </form>
        )
      }
      
    </div>
  )
}