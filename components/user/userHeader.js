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
    <header className={utilsStyles.flexCol}>
      <div className={styles.profilePic}>
        <Image
          src="/images/profile.png"
          height={144}
          width={144}
          alt={user.displayName}
        />
         <button>
          <Image
            src="/icons/edit.png"
            height={30}
            width={30}
            alt="edit icon"
          />
         </button>
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
            {user && <h2>{user.displayName}</h2>}
            <button onClick={() => setEditUsername(true)}>edit</button>
          </div>
        )
      }
    </header>
  )
}