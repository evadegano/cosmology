import React, { useContext } from 'react'
import { Context } from '../../context'

export default function UserAstro() {
  const { lang } = useContext(Context)
  const sunSign = localStorage.getItem('sunSign')
  const moonSign = localStorage.getItem('moonSign')
  const risingSign = localStorage.getItem('risingSign')

  return (
    <section>
      <h2>{lang.profile.astroTitle}</h2>

      <div>
        <div>
          {sunSign}
        </div>
      </div>
    </section>
  )
}