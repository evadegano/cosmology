import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Masonry from 'react-masonry-css'
import styles from '../../../../styles/Feed.module.css'
import Pin from '../../../../components/feed/pin'


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
  const [pins, setPins] = useState()
  const [pinTypes, setPinTypes] = useState()
  const [errorMsg, setErrorMsg] = useState()
  const [loading, setLoading] = useState()

  useEffect(() => {

    if (!pins) {

      async function fetchData() {
        setLoading(true)

        try {
          const pinRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}/pin?lang=en`, {
            method: 'GET',
            headers: {
              'Content-Type':'application/json'
            }
          })
          const pinData = await pinRes.json()
      
          if (pinData.message) {
            console.log("error:", pinData.message)
            setErrorMsg(pinData.message)
          }

          // get unique pin types
          const allTypes = []
          pinData.pins.map(pin => {
            pin.type.map(type => {
              allTypes.push(type.type)
            })
          })
          const uniqueTypes = [...new Set(allTypes)]
      
          // set states
          setPins(pinData.pins)
          setPinTypes(uniqueTypes)
          setLoading(false)
      
        } catch(error) {
          console.log("error:", error)
          setErrorMsg(error.message)
        }
      }

      fetchData()

    }
  }, [id, pins, pinTypes])

  const filterPins = (event) => {
    event.preventDefault()

    // filter props on their type
  }


  return (
    <div>

      {
        loading || !pinTypes
        ? <p></p>
        : <div id={styles.pinTypes}>
            <button onClick={filterPins}>All</button>

            {pinTypes.map(type => {
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
        loading || !pins
        ? <p>We are fetching new pins for you!</p>
        : pins.map(pin => {
          return <Pin key={pin.id} pin={pin} />
        })
      }

      </Masonry>
      
      
      {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}

    </div>
  )
}