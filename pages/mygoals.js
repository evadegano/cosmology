import { useState } from 'react'
import * as Yup from 'yup'
import FormLayout from '../components/userForm/formLayout'
import getGeocode from '../services/getGeocode'


export default function MyGoals({ lang, userForm, setUserForm }) {
  
  const [currentStep, setCurrentStep] = useState(0)

  const submitForm = async (data) => {
    // parse birthday and birthtime

    // get birth location geocode
    const geocode = getGeocode(data.birthLoc)

    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      gender: data.gender,
      birthYear,
      birthMonth,
      birthDay,
      birthHour,
      birthMin,
      birthLat: geocode.latitude,
      birthLong: geocode.longitude
    }

    // get zodiac signs
    // POST signup api
    const signupRes = await fetch('api/auth/signup', {
      method: 'POST',
      body: user,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const userData = await signupRes.json()

    // POST birthchart api
    const birthChartRes = await fetch(`api/user/${userData.id}/birthchart.js`, {
      method: 'POST',
      body
    })
    // redirect user to their profile
    
    console.log('Form submitted.', user)
  }
  
  const steps = [
    [
      {
        name: "birthDate",
        type: "date"
      },
      {
        name: "birthTime",
        type: "time"
      },
      {
        name: "birthLoc",
        type: "text"
      }
    ],
    [
      {
        name: "female",
        type: "checkbox"
      },
      {
        name: "male",
        type: "checkbox"
      },
    ],
    [
      {
        name: "name",
        type: "text"
      },
      {
        name: "email",
        type: "email"
      },
      {
        name: "password",
        type: "password"
      },
      {
        name: "passwordConfirm",
        type: "password"
      },
    ],
  ]

  return (
    <div>
      <FormLayout 
        fields={steps[currentStep]}
        userForm={userForm}
        setUserForm={setUserForm}
        currentStep={currentStep}
        totalSteps={steps.length}  />
    </div>
  )
}

