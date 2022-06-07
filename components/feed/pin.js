import { useState, useContext } from 'react'
import { Context } from '../../context'
import Router from 'next/router'
import Image from "next/image"
import Link from "next/link"
import styles from '../../styles/Feed.module.css'
import utilsStyles from '../../styles/utils.module.css'
import SaveBtn from './saveBtn'
import LikeBtn from './likeBtn'


export default function Pin({ pin }) {
  const { setPinPageData } = useContext(Context)
  const [isPinHovered, setIsPinHovered] = useState(false)

  const goToPinPage = (event) => {
    event.preventDefault()
    setPinPageData(pin)
    Router.push(`/pin/${pin.id}`)
  }

  const sharePin = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div 
      className={utilsStyles.card}
      onMouseEnter={() => setIsPinHovered(true)}
      onMouseLeave={() => setIsPinHovered(false)}
      onClick={goToPinPage}
    >
      
      <div className={styles.pinInnerWrapper} >
        <Image
          className={`${styles.pinImg} ${isPinHovered ? styles.darken : ""}`}
          src={pin.pictureUrl}
          alt={pin.title}
          width={500}
          height={500}
        />

        {isPinHovered && (
          <div className={styles.onHoverFeat} >
            <SaveBtn pin={pin} />
            <LikeBtn pin={pin} />
          </div>
        )}
      </div>

      <h2 className={styles.pinTitle}>{pin.title}</h2>
      {pin.goals.map(goal => <p key={goal.goal}>{goal.goal}</p>)}

    </div>
  )
}