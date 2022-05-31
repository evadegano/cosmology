import Image from "next/image"
import { useContext } from 'react'
import { Context } from "../../context"


export default function UserHeader() {
  const { user } = useContext(Context)

  return (
    <header>
      <Image
        src="/images/profile.png"
        height={144}
        width={144}
        alt="Your Name"
      />

      <h1>{user.email}</h1>

      <div>
        loop through signs
      </div>
    </header>
  )
}