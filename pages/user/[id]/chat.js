import React, { useContext } from 'react'
import { Context } from '../../../context'
import UserLayout from "../../../components/user/userLayout"
import SendMsg from '../../../components/chat/sendMsg'
import Msg from '../../../components/chat/msg'
import Loader from '../../../components/sitewide/loader'
import utilsStyles from '../../../styles/utils.module.css'
import styles from '../../../styles/Chat.module.css'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, query, orderBy, limit } from 'firebase/firestore'
import { firestore } from '../../../config/firebase'


export default function Chat() {
  const { lang } = useContext(Context)
  
  const messagesRef = collection(firestore, 'messages') // ref the messages firestore collection
  const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(25)) // set get messages query
  const [messages] = useCollectionData(q, { idField: 'id' }) // listen to message data with a hook

  return (
    <UserLayout>
      <div id={styles.chat}>
        <h1>Chat with the community</h1>

        {
          !messages
          ? <Loader />
          : messages.map(msg => {
            return (
              <Msg key={msg.createdAt} message={msg} />
            )
          })
        }

        <SendMsg messagesRef={messagesRef} />
      </div>
      
    </UserLayout>
  )
}