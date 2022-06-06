import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Context } from '../context'
import styles from '../styles/UserForm.module.css'
import utilsStyles from '../styles/utils.module.css'
import FormNav from '../components/userForm/formNav'
import StepBirthday from '../components/userForm/stepBirthday'
import StepBirthchart from '../components/userForm/stepBirthchart'
import StepGender from '../components/userForm/stepGender'
import StepSignup from '../components/userForm/stepSignup'


export default function MyGoals() {
  const { lang, userForm, setUserForm, birthchart, setBirthchart } = useContext(Context)
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [firstLoad, setFirstLoad] = useState(true)

  console.log("currentStep", currentStep)
  console.log("currentStepFromStorage", sessionStorage.getItem("currentStep"))
  console.log("firstLoad:", firstLoad)

  useEffect(() => {
    // get current set from session storage
    let currentStepFromStorage = sessionStorage.getItem("currentStep")
    console.log("currentStepFromStorage", currentStepFromStorage)

    if (currentStepFromStorage) {
      currentStepFromStorage = Number(currentStepFromStorage)
      setCurrentStep(currentStepFromStorage)
    }
  }, [])

  const handleNextStep = (newData) => {
    setUserForm(prev => ({ ...prev, ...newData }));

    if (currentStep === steps.length - 1) {
      return
    }

    setCurrentStep((prev) => prev + 1)
    console.log(currentStep)
     // store current step in session storage
     sessionStorage.setItem("currentStep", JSON.stringify(currentStep))
  }

  const handlePrevStep = (newData) => {
    setUserForm(prev => ({ ...prev, ...newData }));

    if (currentStep === 0) {
      router.back()
      return
    }

    setCurrentStep((prev) => prev - 1)
    // store current step in session storage
    sessionStorage.setItem("currentStep", JSON.stringify(currentStep))
  }
  
  const steps = [
    <StepBirthday key='StepBirthday' next={handleNextStep} firstLoad={firstLoad} setFirstLoad={setFirstLoad} />,
    <StepBirthchart key='StepBirthchart' next={handleNextStep} prev={handlePrevStep}  />,
    <StepGender key='StepGender' next={handleNextStep} />,
    <StepSignup key='StepSignup'/>
  ]

  return (
    <div id={styles.userForm}>
      <FormNav prev={handlePrevStep} setFirstLoad={setFirstLoad} />

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

