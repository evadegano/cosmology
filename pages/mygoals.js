import { useState } from 'react'
import * as Yup from 'yup'
import FormLayout from '../components/userForm/formLayout'
import StepOne from '../components/userForm/stepOne'
import StepTwo from '../components/userForm/stepTwo'


export default function MyGoals() {
  const [user, setUser] = useState({
    goals: [],
    birthDate: "",
    birthTime: "",
    gender: "",
    name: "",
    email: "",
    password: ""
  })
  const [currentStep, setCurrentStep] = useState(0)

  const submitForm = (user) => {
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

  const steps = [
    ["goals"],
    ["birthDate", "birthTime"],
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

