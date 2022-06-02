import { useState } from 'react'
import Masonry from 'react-masonry-css'
import styles from "../../styles/Feed.module.css"
import Pin from './pin'
import useSWR from 'swr'


const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1
}

export default function PinMasonry({ pinTypes, filteredPins, data }) {
  const [errorMsg, setErrorMsg] = useState('')
  const [activeBtn, setActiveBtn] = useState('')
  
  // filter pins by type
  const filterPins = (event) => {
    event.preventDefault()
    const { value } = event.target

    if (value === 'all') {
      filteredPins = data.pins
    } else {
      filteredPins = data.pins.filter(pin => {
        for (let type of pin.types) {
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
        !pinTypes || errorMsg
        ? <p>{errorMsg}</p>
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
        !data || errorMsg
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