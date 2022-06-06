import Link from "next/link"
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { Context } from "../../context"
import genBirthChart from "../../services/genBirthChart"
import utilsStyles from '../../styles/utils.module.css'
import Router from 'next/router'


export default function StepSignup() {
  const { lang, user, signup, googleAuth, errorMsg, setErrorMsg, userForm, setUserForm, birthchart } = useContext(Context)
  const [signupCred, setSignupCred] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  })

  const googleSignup = async(event) => {
    event.preventDefault()

    try {
      const signupRes = await googleAuth()
      console.log("signupRes", signupRes)

      await genBirthChart(signupRes)

      // redirect user to their profile
      Router.push(`/user/${signupRes.user.uid}`)

    } catch(err) {
      console.log(err)
      setErrorMsg(err.message)
    }

  }

  const handleSubmit = async(event) => {
    // prevent window from reloading
    event.preventDefault()

    // make sure that password and passwordConfirm match
    if (signupCred.password !== signupCred.passwordConfirm) {
      setErrorMsg("Passwords don't match")
      return
    }
    
    try {
      // sign user up
      const signupRes = await signup(signupCred.email, signupCred.password, signupCred.name)
      await genBirthChart(signupRes)

      // redirect user to their profile
      Router.push(`/user/${signupRes.user.uid}`)

    } catch(err) {
      console.log(err)
      setErrorMsg(err.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    switch (name) {
      case 'name':
        setSignupCred(prev => ({ ...prev, name: value }))
        break
      case 'email':
        setSignupCred(prev => ({ ...prev, email: value }))
        break
      case 'password':
        setSignupCred(prev => ({ ...prev, password: value }))
        break
      case 'passwordConfirm':
        setSignupCred(prev => ({ ...prev, passwordConfirm: value }))
        break
      default:
        break
    }
  }

  return (
    <div className={utilsStyles.authWrapper}>
      <h1>Save your results and get access to your curated content</h1>

      <div className={utilsStyles.flexCol}>
        <button onClick={googleSignup} className={utilsStyles.secondaryBtn + " " + utilsStyles.authBtn}>
          <Image 
            src='/icons/google.png'
            width={20}
            height={20}
            alt='google logo'
          />
          Sign up with Google
        </button>

        <div className={utilsStyles.lineSeparator}>
          <hr/>
          <span>OR</span>
          <hr/>
        </div>

        <form onSubmit={handleSubmit} className={utilsStyles.authForm}>
          <input type='text' name='name' value={userForm.name} placeholder='First name' onChange={handleChange} required />
          <input type='email' name='email' value={signupCred.email} placeholder='Email address' onChange={handleChange} required />
          <input type='password' name='password' value={signupCred.password} placeholder='Password' onChange={handleChange} required />
          <input type='password' name='passwordConfirm' value={signupCred.passwordConfirm} placeholder='Confirm password' onChange={handleChange} required />

          <p>*We will absolutely never share or sell your data. You&rsquo;re welcome to read our <Link href='/info/privacy-policy'><a target='_blank'>Privacy Policy</a></Link> to learn more.</p>

          <button className={utilsStyles.mainBtn} type="submit">Create account</button>
          {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}
        </form>
      </div>
      
    </div>
  )
}