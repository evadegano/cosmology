import React, { useContext } from 'react'
import { Context } from '../../context'
import Router from 'next/router'
import Image from "next/image"
import utilsStyles from '../../styles/utils.module.css'


export default function UserNav() {
  const { lang, setUser, logout, errorMsg, setErrorMsg } = useContext(Context)

  const handleClick = async (event) => {
    // prevent window reload
    event.preventDefault()

    try {
      // redirect user to homepage
      Router.push('/')

      await logout()

    } catch(err) {
      setErrorMsg(err.errorMsg)
    }
  }

  return (
    <nav>
      <Image 
        src='/logo_small.png'
        width={40}
        height={40}
        alt='Cosmology'
      />
      <button onClick={handleClick} className={utilsStyles.simpleBtn}>Logout</button>

      {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}
    </nav>
  )
}