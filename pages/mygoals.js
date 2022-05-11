import { useState } from 'react'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import styles from '../styles/UserForm.module.css'
import utilsStyles from '../styles/utils.module.css'
import FormNav from '../components/userForm/formNav'
import getGeocode from '../services/getGeocode'
import StepBirthday from '../components/userForm/stepBirthday'
import StepGender from '../components/userForm/stepGender'
import StepSignup from '../components/userForm/stepSignup'


export default function MyGoals({ lang, userForm, setUserForm }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const handleNextStep = (newData) => {
    setUserForm(prev => ({ ...prev, ...newData }));

    if (currentStep === steps.length - 1) {
      submitForm(newData)
      return
    }

    setCurrentStep((prev) => prev + 1);
  }

  const handlePrevStep = (newData) => {
    setData(prev => ({ ...prev, ...newData }));

    if (currentStep === 0) {
      router.back()
      return
    }

    setCurrentStep((prev) => prev - 1);
  }

  const submitForm = async (event, data) => {
    event.preventDefault()

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
    <StepBirthday key='StepBirthday' userForm={userForm} setUserForm={setUserForm} />,
    <StepGender key='StepGender' setUserForm={setUserForm} />,
    <StepSignup key='StepSignup' userForm={userForm} setUserForm={setUserForm} />
  ]

  return (
    <div id={styles.userForm}>
      <FormNav prev={handlePrevStep} />

      <main>
       {steps[currentStep]}
        <button className={utilsStyles.mainBtn} onClick={handleNextStep}>
          {currentStep !== steps.length - 1 ? 'Next' : 'Save & Create account'}
        </button>
      </main>

    </div>
  )
}

