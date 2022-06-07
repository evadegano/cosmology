import { useState, useContext, useEffect } from 'react'
import { Context } from '../../context'
import Image from 'next/image'
import styles from '../../styles/Feed.module.css'


export default function LikeBtn({ pin }) {
  const { user } = useContext(Context)
  const [isPinLiked, setIsPinLiked] = useState(false)
  const [errorMsg, setErrorMsg] = useState()  

  useEffect(() => {
    // check whether the user has saved this pin
    for (let likedPin of pin.likedBy) {
      if (likedPin.userId === user.uid) {
        setIsPinLiked(true)
        return
      }
    }

    setIsPinLiked(false)
   
  }, [pin.likedBy, user.uid])
  
  const likePin = async (event) => {
    event.stopPropagation()
    event.preventDefault()
    
    // update pin's instance in db
   try {
    const res = await fetch(`/api/user/${user.uid}/likedpin?pinid=${pin.id}`, ({
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
    setIsPinLiked(true)

   } catch (err) {
    setErrorMsg(err)
   }
  } 

  const deleteLikedPin = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    try {
      const res = await fetch(`/api/user/${user.uid}/likedpin?pinid=${pin.id}`, ({
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
      setIsPinLiked(false)
  
    } catch (err) {
    setErrorMsg(err)
    }
  }

  return (
    <div>
      {
        isPinLiked
        ? (
            <button onClick={deleteLikedPin} className={styles.likeBtn}>
              <Image
                src='/icons/heart_full.png'
                alt={pin.title}
                width={30}
                height={30}
              />
            </button>
          )
        : (
            <button onClick={likePin} className={styles.likeBtn}>
              <Image
                  src='/icons/heart_hollow.png'
                  alt={pin.title}
                  width={30}
                  height={30}
                />
            </button>
          )
      }
    </div>
  )
}