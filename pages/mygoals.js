import { useState } from 'react'
import * as Yup from 'yup'
import FormLayout from '../components/userForm/formLayout'
import getGeocode from '../services/getGeocode'
import goals from '../bin/goals'


export default function MyGoals() {
  
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

  const handleNextStep = (newData, finalStep=false) => {
    setUser(prev => ({...prev, ...newData}))

    if (finalStep) {
      submitForm(newData)
      return
    }

    setCurrentStep(prev => prev + 1)
  }

  const handlePrevStep = (newData) => {
    setUser(prev => ({...prev, ...newData}))
    setCurrentStep(prev => prev - 1)
  }

  const goalFields = []
  goals.map(goal => {
    goalFields.push({ name: goal, type:"checkbox"})
  })
  
  const steps = [
    goalFields,
    [
      {
        name: "birthDate",
        type: "datetime-local"
      },
      {
        name: "birth location",
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
        name: "english",
        type: "checkbox"
      },
      {
        name: "french",
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

  console.log('user:', user)

  return (
    <div>
      <FormLayout 
        next={handleNextStep} 
        prev={handlePrevStep} 
        user={user} 
        fields={steps[currentStep]} 
        currentStep={currentStep}
        totalSteps={steps.length}  />
    </div>
  )
}

