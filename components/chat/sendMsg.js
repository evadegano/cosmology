import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { Context } from '../../context'
import utilsStyles from '../../styles/utils.module.css'


export default function SendMsg() {
  const router = useRouter()
  const { id } = router.query
  const { lang, errorMsg, setErrorMsg } = useContext(Context)
  const [chatMsg, setChatMsg] = useState()

  const handleSubmit = async (event) => {
    // prevent window from reloading
    event.preventDefault()

    try {
      // add message to database
      const messageRes = await fetch(`/api/user/${id}/message`, {
        method: 'POST',
        body: JSON.stringify({ message: chatMsg }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const messageData = await messageRes.json()

      // return error if any
      if (messageData.message) {
        setErrorMsg(messageData.message)
        return
      }

      // reset chatMsg state
      setChatMsg('')

    } catch(err) {
      setErrorMsg(err.message)
    }
  }

  const handleChange = (event) => {
    const { value } = event.target

    // update chatMsg state
    setChatMsg(value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder='Send a message...' name='chatMsg' value={chatMsg} onChange={handleChange} />

        <button type='submit'>Send</button>
        {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}
      </form>
    </div>
  )
}