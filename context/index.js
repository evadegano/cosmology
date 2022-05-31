import React, { useState, createContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import en from '../locales/en'
import fr from '../locales/fr'

export const Context = createContext()

export const ContextProvider = (props) => {
  const router = useRouter()
  const { locale } = router
  const lang = locale === 'en' ? en : fr

  const [user, setUser] = useState("")
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [userForm, setUserForm] = useState({
    goals: [],
    name: "",
    birthDate: "",
    birthTime: "",
    birthLoc: "",
    birthLat: "",
    birthLong: "",
    gender: [],
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
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // set user info
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        })

      } else {
        setUser(null)
      }

      console.log("user from context:", user)
      setLoading(false)
    })

    // when component unmounts, remove listeners from firebase
    return () => unsubscribe()
  }, [])

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    try {
      setUser(null)
      await signOut(auth)

    } catch(err) {
      console.log(err.message)
    }
  }

  const value = {
    lang,
    user,
    setUser,
    errorMsg,
    setErrorMsg,
    login,
    signup,
    logout,
    userForm, 
    setUserForm,
    birthchart, 
    setBirthchart
  }

  return (
    <Context.Provider value={value}>
      {loading ? null : props.children}
    </Context.Provider>
  )
}