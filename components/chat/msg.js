import { auth } from "../../config/firebase"

export default function Msg({ message }) {
  return (
    <div>
      {
        message.senderId === auth.currentUser.uid
        ? <p>{message.message}</p>
        : <div>
            <p>{message.senderId}</p>
            <p>{message.message}</p>
          </div>
      }
    </div>
  )
}