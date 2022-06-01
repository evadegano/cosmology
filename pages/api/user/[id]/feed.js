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
  const [errorMsg, setErrorMsg] = useState('')
  const [activeBtn, setActiveBtn] = useState('')
  let pinTypes, filteredPins

  // get pins data
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}/pin?lang=en`)
  if (error) setErrorMsg(error)

  console.log("data:", data.pins)
  
  // once data was fetched, get unique pin types
  if (data) {
    const allTypes = []
    data.pins.map(pin => {
      pin.type.map(type => {
        allTypes.push(type.type)
      })
    })
    pinTypes = [...new Set(allTypes)]

    filteredPins = data.pins
  }
  
  // filter pins by type
  const filterPins = (event) => {
    event.preventDefault()

    const { value } = event.target
    console.log("value:", value)

    if (value === 'all') {
      filteredPins = data.pins
    } else {
      filteredPins = data.pins.filter(pin => {
        for (let type of pin.type) {
          return type.type === "reading" 
        }
      })
    }

    console.log("filteredPins", filteredPins)
    // set button to active 
    setActiveBtn(value)
  }


  return (
    <div>

      {
        !pinTypes
        ? <p></p>
        : <div id={styles.pinTypes}>
            <button value='all' onClick={filterPins}>All</button>

            {pinTypes.map(type => {
              return <button key={type} value={type} onClick={filterPins}>{type}</button>
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
        : filteredPins.map(pin => {
          return <Pin key={pin.id} pin={pin} />
        })
      }

      </Masonry>
      
      
      {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}

    </div>
  )
}