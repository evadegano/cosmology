import React, { useState, createContext } from 'react'
import { useRouter } from 'next/router'
import en from '../locales/en'
import fr from '../locales/fr'

export const Context = createContext()

export const ContextProvider = (props) => {
  const router = useRouter()
  const { locale } = router
  const lang = locale === 'en' ? en : fr

  const [userName, setUserName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  
  const value = {
    lang,
    userName,
    setUserName,
    errorMsg,
    setErrorMsg
  }

  return <Context.Provider value={value}>{props.children}</Context.Provider>
}