import { useState, useContext } from 'react'
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
    <StepBirthday key='StepBirthday' next={handleNextStep} />,
    <StepBirthchart key='StepBirthchart' next={handleNextStep} prev={handlePrevStep}  />,
    <StepGender key='StepGender' next={handleNextStep} />,
    <StepSignup key='StepSignup'/>
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

