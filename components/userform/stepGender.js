import { Formik, Form, Field, ErrorMessage } from "formik";
import utilsStyles from '../../styles/utils.module.css'


export default function StepGender({ userForm, setUserForm, next }) {
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

      <form id={utilsStyles.goalForm}>
          
        <label>
          <input onChange={handleChange} type='checkbox' value='FEMALE' name='women' />
          <span>Women</span>
        </label>

        <label>
          <input onChange={handleChange} type='checkbox' value='MALE' name='men' />
          <span>Men</span>
        </label>

        <button className={utilsStyles.mainBtn} onClick={next}>Next</button>
      </form>
    </div>
  )
}