import Autocomplete from 'react-google-autocomplete'
import { Formik, Form, Field, ErrorMessage } from "formik"


export default function StepBirthday({ userForm, setUserForm }) {
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
    
    console.log(userForm);
  }

  return (
    <div>
      <h1>Tell us more about your birthday</h1>
      <p>It’s not law but your birth sign will help us get real specific</p>

      <form>
        <span>
          I was born on <input type='date' name='birthDate' value={userForm.birthDate} onChange={handleChange} /> 
          at <input type='time' name='birthTime' value={userForm.birthTime} onChange={handleChange} />
          in <input id='autocomplete' type='text' name='birthLoc' value={userForm.birthLoc} onChange={handleChange} />
          {/*<Autocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            onPlaceSelected={(place) => console.log(place)}
          />*/}
        </span>
      </form>
    </div>
  )
}