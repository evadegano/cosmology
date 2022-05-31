import Link from "next/link"
import React, { useContext, useState } from 'react'
import { Context } from "../../context"
import utilsStyles from '../../styles/utils.module.css'
import Router from 'next/router'


export default function StepSignup() {
  const { lang, user, signup, errorMsg, setErrorMsg, userForm, setUserForm, birthchart } = useContext(Context)
  const [signupCred, setSignupCred] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  })

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
      const signupRes = await signup(signupCred.email, signupCred.password)

      // store user data for db instance
      const userForDB = {
        id: signupRes.user.uid,
        goals: userForm.goals,
        name: userForm.name,
        gender: userForm.gender,
        lang: lang,
        birthDate: userForm.birthDate,
        birthTime: userForm.birthTime,
        birthLat: userForm.birthLat,
        birthLong: userForm.birthLong
      }

      // add user to database
      const newUserRes = await fetch('api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ user: userForDB, birthchart }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const userData = await newUserRes.json()
      console.log("userData", userData);

      // return if error
      if (userData.message) {
        setErrorMsg(userData.message)
        return
      }

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
        setUserForm(prev => ({ ...prev, name: value }))
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
    <div>
      <h1>Save your results and get access to your curated content!</h1>

      <form onSubmit={handleSubmit}>
        <label>Your first name</label>
        <input type='text' name='name' value={userForm.name} placeholder='' onChange={handleChange} required />

        <label>Your email address</label>
        <input type='email' name='email' value={signupCred.email} placeholder='' onChange={handleChange} required />

        <label>Your password</label>
        <input type='password' name='password' value={signupCred.password} placeholder='' onChange={handleChange} required />

        <label>Confirm your password</label>
        <input type='password' name='passwordConfirm' value={signupCred.passwordConfirm} placeholder='' onChange={handleChange} required />

        <p>*We will never share or sell your data. You&rsquo;re welcome to read our <Link href='/privacy-policy'><a>Privacy Policy</a></Link> to learn more.</p>

        <button className={utilsStyles.mainBtn} type="submit">Save & create account</button>
        {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}
      </form>
    </div>
  )
}