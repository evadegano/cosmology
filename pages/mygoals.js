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
      return
    }

    setCurrentStep((prev) => prev + 1);
  }

  const handlePrevStep = (newData) => {
    setUserForm(prev => ({ ...prev, ...newData }));

    if (currentStep === 0) {
      router.back()
      return
    }

    setCurrentStep((prev) => prev - 1);
  }
  
  const steps = [
    <StepBirthday key='StepBirthday' userForm={userForm} next={handleNextStep} setUserForm={setUserForm} setBirthchart={setBirthchart} />,
    <StepBirthchart key='StepBirthchart' birthchart={birthchart} next={handleNextStep} prev={handlePrevStep}  />,
    <StepGender key='StepGender' userForm={userForm} setUserForm={setUserForm} next={handleNextStep} />,
    <StepSignup key='StepSignup' userForm={userForm} setUserForm={setUserForm} birthchart={birthchart} />
  ]

  return (
    <div id={styles.userForm}>
      <FormNav prev={handlePrevStep} />

      <main>
        <div id={styles.stepsCountWrapper}>
        {steps.map((el, idx) => {
            return <div key={idx} id={styles.stepsCount} className={idx === currentStep ? styles.active : ''}></div>
          })}
        </div>
        
        {steps[currentStep]}
      </main>

    </div>
  )
}

