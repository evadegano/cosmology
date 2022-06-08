import React, { useState, createContext, useEffect } from 'react'
import Router from 'next/router'
import { useRouter } from 'next/router'
import { 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut 
} from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'
import genBirthChart from '../services/genBirthChart'
import en from '../locales/en'
import fr from '../locales/fr'

export const Context = createContext()

export const ContextProvider = (props) => {
  const router = useRouter()
  const { locale } = router
  const lang = locale === 'en' ? en : fr

  const [user, setUser] = useState("")
  const [pinPageData, setPinPageData] = useState("")
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [userForm, setUserForm] = useState({
    goals: [],
    birthDate: "",
    birthTime: "",
    birthLoc: "",
    birthLat: "",
    birthLong: "",
    gender: []
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

  const emailSignup = async (email, password, name) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(auth.currentUser)
      await updateProfile(auth.currentUser, { displayName: name })
      await genBirthChart(user)

      localStorage.setItem('user', JSON.stringify(user))

      // redirect user to their profile
      Router.push(`/user/${user.uid}`)

    } catch(err) {
      console.log(err.message)
      setErrorMsg(err.message)
    }

  }

  const googleSignup = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider)
      await genBirthChart(user)

      localStorage.setItem('user', JSON.stringify(user))

      // redirect user to their profile
      Router.push(`/user/${user.uid}`)

    } catch(err) {
      setErrorMsg(err.message)
    }
  }

  const emailLogin = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)

      localStorage.setItem('user', JSON.stringify(user))

      // redirect user to their profile
      Router.push(`/user/${user.uid}`)

    } catch(err) {
      setErrorMsg(err.message)
    }
  }

  const googleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider)

      localStorage.setItem('user', JSON.stringify(user))

      // redirect user to their profile
      Router.push(`/user/${user.uid}`)

    } catch(err) {
      setErrorMsg(err.message)
    } 
  }

  const logout = async () => {
    try {
      setUser(null)
      await signOut(auth)

      // redirect user to homepage
      Router.push('/')

      localStorage.removeItem('user')

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
    emailLogin,
    googleLogin,
    emailSignup,
    googleSignup,
    logout,
    userForm, 
    setUserForm,
    birthchart, 
    setBirthchart,
    pinPageData,
    setPinPageData
  }

  return (
    <Context.Provider value={value}>
      {loading ? null : props.children}
    </Context.Provider>
  )
}