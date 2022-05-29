import Link from "next/link"
import utilsStyles from '../../styles/utils.module.css'
import Router from 'next/router'
import { useState } from 'react'


export default function StepSignup({ userForm, setUserForm, birthchart }) {
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (event) => {
    // prevent window from reloading
    event.preventDefault()

    // store user data for db instance
    const user = {
      name: userForm.name,
      email: userForm.email,
      password: userForm.password,
      passwordConfirm: userForm.passwordConfirm,
      gender: userForm.gender,
      birthDate: userForm.birthDate,
      birthTime: userForm.birthTime,
      birthLat: userForm.birthLat,
      birthLong: userForm.birthLong
    }
    
    try {
      // POST signup api
      const signupRes = await fetch('api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ user, birthchart }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const userData = await signupRes.json()
      console.log("userData", userData);
      
      // return if error
      if (userData.message) {
        setErrorMsg(userData.message)
        return
      }
      
      // redirect user to their profile
      Router.push(`/user/${userData.id}`)

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
        setUserForm(prev => ({ ...prev, email: value }))
        break
      case 'password':
        setUserForm(prev => ({ ...prev, password: value }))
        break
      case 'passwordConfirm':
        setUserForm(prev => ({ ...prev, passwordConfirm: value }))
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
        <input type='email' name='email' value={userForm.email} placeholder='' onChange={handleChange} required />

        <label>Your password</label>
        <input type='password' name='password' value={userForm.password} placeholder='' onChange={handleChange} required />

        <label>Confirm your password</label>
        <input type='password' name='passwordConfirm' value={userForm.passwordConfirm} placeholder='' onChange={handleChange} required />

        <p>*We will never share or sell your data. You&rsquo;re welcome to read our <Link href='/privacy-policy'><a>Privacy Policy</a></Link> to learn more.</p>

        <button className={utilsStyles.mainBtn} type="submit">Save & create account</button>
        {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}
      </form>
    </div>
  )
}