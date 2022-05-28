import '../styles/globals.css'
import '../styles/fonts.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import en from '../locales/en'
import fr from '../locales/fr'


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()
  const { locale } = router
  const lang = locale === 'en' ? en : fr

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
    <Component 
      {...pageProps} 
      lang={lang} 
      userForm={userForm} setUserForm={setUserForm} 
      birthchart={birthchart} setBirthchart={setBirthchart} 
    />
  )
}

export default MyApp
