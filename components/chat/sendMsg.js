import React, { useContext, useState } from 'react'
import { Context } from '../../context'
import { collection, addDoc } from 'firebase/firestore'
import { auth, firestore } from '../../config/firebase'
import utilsStyles from '../../styles/utils.module.css'


export default function SendMsg() {
  const { lang, errorMsg, setErrorMsg } = useContext(Context)
  const [chatMsg, setChatMsg] = useState('')

  const handleSubmit = async (event) => {
    // prevent window from reloading
    event.preventDefault()

    // add display name and profile pic
    const { uid } = auth.currentUser

    // create new doc in firestore
    await addDoc(collection(firestore, 'messages'), {
      message: chatMsg,
      senderId: uid,
      createdAt: Date.now()
    })

    // reset state 
    setChatMsg('')
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