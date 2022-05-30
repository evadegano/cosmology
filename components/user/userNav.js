import React, { useContext } from 'react'
import { Context } from '../../context'
import Router from 'next/router'
import Image from "next/image"


export default function UserNav() {
  const { lang } = useContext(Context)

  const logout = async (event) => {
    // prevent window reload
    event.preventDefault()

    // log user out
    const logoutRes = await fetch('/api/auth/logout', {
      method: 'POST',
    })

    // redirect user to homepage
    Router.push('/')
  }

  return (
    <nav>
      <div>logo</div>
      <button onClick={logout}>Logout</button>
    </nav>
  )
}