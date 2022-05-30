import '../styles/globals.css'
import '../styles/fonts.css'
import { useState } from 'react'
import { ContextProvider } from '../context'


function MyApp({ Component, pageProps }) {
  const [userForm, setUserForm] = useState({
    goals: [],
    birthDate: "",
    birthTime: "",
    birthLoc: "",
    birthLat: "",
    birthLong: "",
    gender: [],
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  })

  const [birthchart, setBirthchart] = useState({
    sunSign: "",
    moonSign: "",
    risingSign: "",
    northNode: "",
    southNode: "",
    venus: "",
  })

  return (
    <ContextProvider>
      <Component 
        {...pageProps} 
        userForm={userForm} setUserForm={setUserForm} 
        birthchart={birthchart} setBirthchart={setBirthchart} 
      />
    </ContextProvider>
  )
}

export default MyApp
