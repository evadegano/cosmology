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
      await logout()

      // redirect user to homepage
      Router.push('/')

    } catch(err) {
      setErrorMsg(err.errorMsg)
    }
  }

  return (
    <nav>
      <div>logo</div>
      <button onClick={handleClick}>Logout</button>

      {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}
    </nav>
  )
}