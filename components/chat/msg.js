import { auth } from "../../config/firebase"
import styles from '../../styles/Chat.module.css'


export default function Msg({ message }) {
  return (
    <div>
      {
        message.senderId === auth.currentUser.uid
        ? <p className={styles.sentMsg}>{message.message}</p>
        : <div>
            <p>{message.senderId}</p>
            <p className={styles.receivedMsg}>{message.message}</p>
          </div>
      }
    </div>
  )
}