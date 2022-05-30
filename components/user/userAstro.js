import React, { useContext } from 'react'
import { Context } from '../../context'

export default function UserAstro() {
  const { lang } = useContext(Context)

  return (
    <section>
      <h2>{lang.profile.astroTitle}</h2>

      {lang.profile.astroButtons.map(btn => {
        return <button key={btn}>{btn}</button>
      })}
    </section>
  )
}