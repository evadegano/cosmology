import { useState } from 'react'
import Router from 'next/router'
import Image from "next/image"
import Link from "next/link"
import styles from '../../styles/Feed.module.css'
import SaveBtn from './saveBtn'
import LikeBtn from './likeBtn'


export default function Pin({ pin }) {
  const [isPinHovered, setIsPinHovered] = useState(false)
  const [savingPin, setSavingPin] = useState(false)

  const sharePin = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const likePin = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div 
      onMouseEnter={() => setIsPinHovered(true)}
      onMouseLeave={() => setIsPinHovered(false)}
      onClick={() => Router.push(`/pin/${pin.id}`)}
    >
      
      <div className={styles.pinInnerWrapper} >
        <Image
          className={styles.pinImg}
          src={pin.pictureUrl}
          alt={pin.title}
          width={500}
          height={500}
        />

        {isPinHovered && (
          <div className={styles.onHoverFeat} >
            <SaveBtn pin={pin} />
            <div>
              <button onClick={sharePin}>share</button>
              <LikeBtn pin={pin} />
            </div>
          </div>
        )}
      </div>

      <h2 className={styles.pinTitle}>{pin.title}</h2>
      {pin.goals.map(goal => <p key={goal.goal}>{goal.goal}</p>)}

    </div>
  )
}