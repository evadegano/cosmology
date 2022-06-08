import React, { useContext, useState } from 'react'
import { Context } from '../context'
import Router from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Layout, { appName } from '../components/sitewide/layout'
import utilsStyles from '../styles/utils.module.css'


export default function Login() {
  const { lang, user, emailLogin, googleLogin, errorMsg, setErrorMsg } = useContext(Context)

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
      await emailLogin(loginCred.email, loginCred.password)
      
    } catch(err) {
      setErrorMsg(err.message)
    }
  }

  return (
    <Layout>
      <nav className={utilsStyles.simpleNav}>
        <Link href='/'>
          <a onClick={() => { 
              setUserForm('')
              setFirstLoad(true)
            }}>
            <Image 
              src='/logo.png'
              width={1563/8.5}
              height={377/8.5}
              alt='Cosmology'
            />
          </a>
        </Link>
      </nav>

      <main id={utilsStyles.loginPage}>
        <div className={utilsStyles.authWrapper}>
          <h1>Welcome back!</h1>

          <div className={utilsStyles.flexCol}>
            <button onClick={googleLogin} className={utilsStyles.secondaryBtn + " " + utilsStyles.authBtn}>
              <Image 
                src='/icons/google.png'
                width={20}
                height={20}
                alt='google logo'
              />
              Log in with Google
            </button>

            <div className={utilsStyles.lineSeparator}>
              <hr/>
              <span>OR</span>
              <hr/>
            </div>

            <form onSubmit={handleSubmit} className={utilsStyles.authForm}>
              <input type='email' name='email' value={loginCred.email} placeholder='Email address' onChange={handleChange} required />
              <input type='password' name='password' value={loginCred.password} placeholder='Password' onChange={handleChange} required />

              <button className={utilsStyles.mainBtn} type="submit">Log in</button>
              {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}
            </form>
          </div>
        </div>
      </main>
    </Layout>
  )
}