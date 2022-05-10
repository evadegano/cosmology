import { Formik, Form, Field, ErrorMessage } from "formik";
import utilStyles from '../../styles/utils.module.css'


export default function StepGender({ setUserForm }) {
  const handleChange = (event) => {
    const value  = event.target.value

    setUserForm(prev => ({ ...prev, gender: value }))
  }

  return (
    <div>
      <h1>Would you like your content to be for...</h1>

      <form id={utilStyles.goalForm}>
          
        <label>
          <input onChange={handleChange} type='checkbox' value='women' name='women' />
          <span>Women</span>
        </label>

        <label>
          <input onChange={handleChange} type='checkbox' value='men' name='men' />
          <span>Men</span>
        </label>

        <label>
          <input onChange={handleChange} type='checkbox' value='both' name='both' />
          <span>Both</span>
        </label>

      </form>
    </div>
  )
}