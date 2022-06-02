import { useState, useContext, useEffect } from 'react'
import { Context } from '../../context'

export default function SaveBtn({ pin }) {
  const { user } = useContext(Context)
  const [isPinSaved, setIsPinSaved] = useState()
  const [errorMsg, setErrorMsg] = useState()

  console.log("pinid:", pin.id)

  useEffect(() => {
    // check whether the user has saved this pin
    for (let savedPin of pin.savedIn) {
      if (savedPin.userId === user.uid) {
        setIsPinSaved(true)
        return
      }
    }

    setIsPinSaved(false)
   
  }, [pin.savedIn, user.uid])
  
  const savePin = async (event) => {
    event.stopPropagation()
    event.preventDefault()
    
    // update pin's instance in db
   try {
    const res = await fetch(`/api/user/${user.uid}/savepin?pinid=${pin.id}`, ({
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      }
    }))

    const data = res.json()
    if (data.message) {
      setErrorMsg(data.message)
      return
    }

    // update pin state
    setIsPinSaved(true)

   } catch (err) {
    setErrorMsg(err)
   }
  } 

  const deleteSavedPin = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    try {
      const res = await fetch(`/api/user/${user.uid}/savepin?pinid=${pin.id}`, ({
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json'
        }
      }))
  
      const data = res.json()
      if (data.message) {
        setErrorMsg(data.message)
        return
      }
  
      // update pin state
      setIsPinSaved(false)
  
    } catch (err) {
    setErrorMsg(err)
    }
  }

  return (
    <div>
      {
        isPinSaved
        ? <button onClick={deleteSavedPin}>Saved</button>
        : <button onClick={savePin}>Save</button>
      }
    </div>
  )
}