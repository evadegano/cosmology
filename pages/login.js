import React, { useContext, useState } from 'react'
import { Context } from '../context'
import Router from 'next/router'
import Link from 'next/link'
import Layout, { appName } from '../components/sitewide/layout'
import utilsStyles from '../styles/utils.module.css'


export default function Login() {
  const { lang, user, login, errorMsg, setErrorMsg } = useContext(Context)

  const [loginCred, setLoginCred] = useState({
    email: "",
    password: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    switch (name) {
      case 'email':
        setLoginCred(prev => ({...prev, email: value}))
        break
      case 'password':
        setLoginCred(prev => ({...prev, password: value}))
        break
      default:
        break
    }
  }

  const handleSubmit = async (event) => {
    // prevent reload
    event.preventDefault()

    try {
      // log user in using Firebase
      const loginRes = await login(loginCred.email, loginCred.password)

      // redirect user to their profile
      Router.push(`/user/${loginRes.user.uid}`)
      
    } catch(err) {
      setErrorMsg(err.message)
    }
  }

  return (
    <Layout lang={lang}>
      <nav>
        <Link href='/'><a>Cosmology</a></Link>
      </nav>

      <main>
        <form onSubmit={handleSubmit}>
          <label>Your email address:</label>
          <input type='text' name='email' value={loginCred.email} onChange={handleChange} />
          
          <label>Your password:</label>
          <input type='password' name='password' value={loginCred.password} onChange={handleChange} />
          
          <button className={utilsStyles.mainBtn} type="submit">Log in</button>

          {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}
        </form>
      </main>
    </Layout>
  )
}