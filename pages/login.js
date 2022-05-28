import Router from 'next/router'
import Layout, { appName } from '../components/sitewide/layout'
import { useState } from 'react'
import utilsStyles from '../styles/utils.module.css'


export default function Login({ lang }) {
  const [loginCred, setLoginCred] = useState({
    email: "",
    password: ""
  })

  handleChange = (event) => {
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

  handleSubmit = (event) => {
    // prevent reload
    event.preventDefault()

    // log user in

    // redirect user to their profile
    Router.push(`/user`)
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
        </form>
      </main>
    </Layout>
  )
}