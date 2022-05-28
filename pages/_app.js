import '../styles/globals.css'
import '../styles/fonts.css'
import { SessionProvider } from "next-auth/react"
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
    <SessionProvider session={session}>
      <Component 
        {...pageProps} 
        lang={lang} 
        userForm={userForm} setUserForm={setUserForm} 
        birthchart={birthchart} setBirthchart={setBirthchart} 
      />
    </SessionProvider>
  )
}

export default MyApp
