import { Formik, Form, Field, ErrorMessage } from "formik";
import utilsStyles from '../../styles/utils.module.css'
import { useContext } from 'react'
import { Context } from "../../context";


export default function StepGender({ next }) {
  const { lang, userForm, setUserForm, errorMsg, setErrorMsg } = useContext(Context)
  
  const handleSubmit = (event) => {
    // prevent window from reloading
    event.preventDefault()

    const { gender } = userForm

    // make sure that at least one gender has been chosen
    if (gender.length === 0) {
      setErrorMsg("Please choose at least one gender.")
      return
    }

    // go to next form step
    next()
  }

  const handleChange = (event) => {
    const value  = event.target.value
    const genderCopy = [...userForm.gender]

    if (event.target.checked) {
      genderCopy.push(value)
    } else {
      genderCopy = genderCopy.filter(el => el !== value)
    }
    
    setUserForm(prev => ({ ...prev, gender: genderCopy }))
  }

  return (
    <div>
      <h1>Would you like your content to be for...</h1>
      <p>Select one or both</p>

      <form id={utilsStyles.goalForm} onSubmit={handleSubmit}>
          
        <label>
          <input onChange={handleChange} type='checkbox' value='FEMALE' name='women' />
          <span>Women</span>
        </label>

        <label>
          <input onChange={handleChange} type='checkbox' value='MALE' name='men' />
          <span>Men</span>
        </label>

        <button className={utilsStyles.mainBtn} type='submit'>Next</button>

        {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}
      </form>
    </div>
  )
}