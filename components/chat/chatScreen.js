import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"


export default function ChatScreen(props) {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      {props.messages.map(msg => {
        return (
          <div key={msg.id}>
          {
            msg.sender.id === id
            ? <p>{msg.message}</p>
            : <div> 
                <p>{msg.sender.name}</p>

                <div>
                  <Link href={`/user/${msg.sender.id}`}><a>{msg.sender.profilePic}</a></Link>
                  <p>{msg.message}</p>
                </div>
              </div>
          }
          </div>
        )
      })}
    </div>
  )
}