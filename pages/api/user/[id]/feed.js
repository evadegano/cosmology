import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Masonry from 'react-masonry-css'
import styles from '../../../../styles/Feed.module.css'
import Pin from '../../../../components/feed/pin'
import useSWR from 'swr'


const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1
}

export default function Feed() {
  const router = useRouter()
  const { id } = router.query
  const [errorMsg, setErrorMsg] = useState()

  // get pins
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}/pin?lang=en`)
  if (error) setErrorMsg(error)
  
  // get unique pin types
  const allTypes = []
  data.pins.map(pin => {
    pin.type.map(type => {
      allTypes.push(type.type)
    })
  })
  const uniqueTypes = [...new Set(allTypes)]

  const filterPins = (event) => {
    event.preventDefault()

    // filter props on their type
  }


  return (
    <div>

      {
        !uniqueTypes
        ? <p></p>
        : <div id={styles.pinTypes}>
            <button onClick={filterPins}>All</button>

            {uniqueTypes.map(type => {
              return <button key={type} onClick={filterPins}>{type}</button>
            })}
          </div>
      }

      <Masonry
        breakpointCols={breakpointObj}
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGrid_column}
      >

      {
        !data
        ? <p>We are fetching new pins for you!</p>
        : data.pins.map(pin => {
          return <Pin key={pin.id} pin={pin} />
        })
      }

      </Masonry>
      
      
      {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}

    </div>
  )
}