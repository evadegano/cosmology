import React, { userEffect, useContext } from 'react'
import { Context } from '../../../context'
import { PrismaClient } from '@prisma/client'
import UserLayout from "../../../components/user/userLayout"
import SendMsg from '../../../components/chat/sendMsg'
import ChatScreen from '../../../components/chat/chatScreen'
import utilsStyles from '../../../styles/utils.module.css'


const prisma = new PrismaClient()


export async function getServerSideProps(context) {
  try {
    // get last ten messages
    const messages = await prisma.message.findMany({
      select: {
        id: true,
        message: true,
        sender: {
          select: {
            id: true,
            name: true,
            profilePic: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    })

    // return messages as props
    return {
      props: {
        messages: JSON.stringify(messages)
      }
    }

  } catch(err) {
    // return error as props
    return {
      props: {
        error: JSON.stringify(err.message)
      }
    }
  }
}


export default function Chat(props) {
  const { lang } = useContext(Context)
  const messages = JSON.parse(props.messages)

  return (
    <UserLayout>
      <h1>Chat with the community</h1>

      {
        messages.length > 0
        ? <ChatScreen messages={messages} />
        : <p>No new message</p>
      }
      
      {props.error && <p className={utilsStyles.error}>{props.error}</p>}

      <SendMsg/>
    </UserLayout>
  )
}