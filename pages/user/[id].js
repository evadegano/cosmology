import UserLayout from "../../components/user/userLayout"
import { useEffect, useState } from 'react'
import styles from '../../styles/Feed.module.css'
import utilsStyles from '../../styles/utils.module.css'
import Masonry from 'react-masonry-css'

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1
}


export default function UserProfile() { 
  // pinTypes = JSON.parse(pinTypes)
  const [pinTypes, setPinTypes] = useState()
  const [errorMsg, setErrorMsg] = useState()
  const [loading, setLoading] = useState()

  const temp = true

  useEffect(() => {
    console.log("pinTypes", pinTypes)
    if (!pinTypes) {

      async function fetchData() {
        setLoading(true)

        try {
          const pinTypesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pinType`, {
            method: 'GET',
            headers: {
              'Content-Type':'application/json'
            }
          })
          const pinTypesData = await pinTypesRes.json()
      
          if (pinTypesData.message) {
            setErrorMsg(pinTypesData.message)
          }

          console.log("UseEffect:", pinTypesData.types)
      
          setPinTypes(pinTypesData.types)
          setLoading(false)
      
        } catch(error) {
          setErrorMsg(error)
        }
      }

      fetchData()

    }
  }, [pinTypes])

  const filterPins = (event) => {
    event.preventDefault()

    // filter props on their type
  }

  return (
    <UserLayout >
      
      {
        loading || !pinTypes
        ? <p>We are fetching your data</p>
        : <div id={styles.pinTypes}>
            <button onClick={filterPins}>All</button>

            {pinTypes.map(type => {
              return <button key={type.id} onClick={filterPins}>{type.type}</button>
            })}
          </div>
      }

      <Masonry
        breakpointCols={breakpointObj}
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGrid_column}
      >
        <div>My Element</div>
        <div>My Element</div>
        <div>My Element</div>
        <div>My Element</div>
      </Masonry>
      
      
      {errorMsg && <p className={utilsStyles.erro}>{errorMsg}</p>}
    </UserLayout>
    
  )
}