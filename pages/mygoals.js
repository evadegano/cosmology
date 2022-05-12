import { useState } from 'react'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import styles from '../styles/UserForm.module.css'
import utilsStyles from '../styles/utils.module.css'
import FormNav from '../components/userForm/formNav'
import StepBirthday from '../components/userForm/stepBirthday'
import StepBirthchart from '../components/userForm/stepBirthchart'
import StepGender from '../components/userForm/stepGender'
import StepSignup from '../components/userForm/stepSignup'


export default function MyGoals({ lang, userForm, setUserForm, birthchart, setBirthchart }) {
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

    
    // POST signup api
    const signupRes = await fetch('api/auth/signup', {
      method: 'POSsT',
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
    <StepBirthday key='StepBirthday' userForm={userForm} setUserForm={setUserForm} setBirthchart={setBirthchart} />,
    <StepBirthchart key='StepBirthchart' birthchart={birthchart}  />,
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

