import Image from "next/image"
import useSWR from 'swr'
import { useState, useContext } from 'react'
import { Context } from "../../context"
import { getAuth, updateProfile } from "firebase/auth"
import styles from '../../styles/User.module.css'
import utilsStyles from '../../styles/utils.module.css'


const auth = getAuth()

export default function UserHeader() {
  const { user } = useContext(Context)
  const [errorMsg, setErrorMsg] = useState("")
  const [username, setUsername] = useState("")
  const [editUsername, setEditUsername] = useState(false)
  
  // fetch data from api
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user.uid}/birthchart`)

  // check for fetching error
  if (error) {
    console.log("data fetching error:", error)

  } else if (data) {
    console.log("data:", data)

    // check for error message
    if (data.message) {
      console.log("data fetching error:", data.message)
    } 
  }

  const handleChange = (event) => {
    const { value } = event.target
    setUsername(value)
  }

  const editUserName = (event) => {
    event.preventDefault()

    updateProfile(auth.currentUser, {
      displayName: username
    }).then(() => {
      console.log("user was updated")
      setEditUsername(false)
    }, (error) => {
      setErrorMsg(error)
    })
  }

  return (
    <header>
      <div className={styles.profilePic}>
        <Image
          src="/images/profile.png"
          height={144}
          width={144}
          alt="Your Name"
        />
         <button>edit</button>
      </div>
      
      {
        editUsername
        ? (
          <form onSubmit={editUserName}>
            <button onClick={() => setEditUsername(false)}>x</button>
            <input placeholder={user.displayName} name="username" value={username} onChange={handleChange} />
            <button type="submit">save</button>

            {errorMsg && <p className={utilsStyles.error}>{errorMsg}</p>}
          </form>
        )
        : (
          <div>
            <h2>{user.displayName}</h2>
            <button onClick={() => setEditUsername(true)}>edit</button>
          </div>
        )
      }
      
      <div>
        {
          data
          ? <div>
            {
              Object.entries(data.birthChart).map(([key,value]) => <p key={key}>{value}</p>)

            }
            </div>
          : <p>We are fetching your birthchart!</p>
        }
      </div>
    </header>
  )
}