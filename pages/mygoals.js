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
  const [firstLoad, setFirstLoad] = useState(true)
  let currentStep = Number(sessionStorage.getItem('currentStep'))

  console.log("currentStep", sessionStorage.getItem('currentStep'))

  const handleNextStep = (newData) => {
    setUserForm(prev => ({ ...prev, ...newData }));

    if (currentStep === steps.length - 1) {
      return
    }

    // update current step in session storage
    currentStep += 1
    sessionStorage.setItem('currentStep', currentStep)
    console.log("currentStep updated", currentStep)
  }

  const handlePrevStep = (newData) => {
    setUserForm(prev => ({ ...prev, ...newData }));

    if (currentStep === 0) {
      router.back()
      return
    }

    // update current step in session storage
    currentStep -= 1
    sessionStorage.setItem('currentStep', currentStep)
    console.log("currentStep updated", currentStep)
  }
  
  const steps = [
    <StepBirthday key='StepBirthday' next={handleNextStep} firstLoad={firstLoad} setFirstLoad={setFirstLoad} />,
    <StepBirthchart key='StepBirthchart' next={handleNextStep} prev={handlePrevStep}  />,
    <StepGender key='StepGender' next={handleNextStep} />,
    <StepSignup key='StepSignup'/>
  ]

  return (
    <div id={styles.userForm}>
      <FormNav prev={handlePrevStep} setFirstLoad={setFirstLoad}/>

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

