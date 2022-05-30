import React, { useContext } from 'react'
import { Context } from '../../context'

export default function UserActions() {
  const { lang } = useContext(Context)
  
  return (
    <div>
      {lang.profile.actionButtons.map(btn => {
        return <button key={btn}>{btn}</button>
      })}
    </div>
  )
}