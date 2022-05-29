import Router from 'next/router'
import Layout, { appName } from '../components/sitewide/layout'
import { useState } from 'react'
import utilsStyles from '../styles/utils.module.css'


export default function Login({ lang }) {
  const [loginCred, setLoginCred] = useState({
    email: "",
    password: ""
  })

  const [errorMsg, setErrorMsg] = useState("")

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

    const { email, password } = loginCred

    try {
      // log user in
      const loginRes = await fetch('api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const userData = await loginRes.json()
      console.log("userData", userData);

      // return if error
      if (userData.message) {
        setErrorMsg(userData.message)
        return
      }

      // redirect user to their profile
      Router.push(`/user/${userData.id}`)
      
    } catch(err) {
      setErrorMsg(err.message)
    }
  }

  return (
    <Layout lang={lang}>
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