import React, { userEffect, useContext } from 'react'
import { Context } from '../../../context'
import { PrismaClient } from '@prisma/client'
import UserLayout from "../../../components/user/userLayout"
import SendMsg from '../../../components/chat/sendMsg'
import utilsStyles from '../../../styles/utils.module.css'


const prisma = new PrismaClient()


export async function getServerSideProps(context) {
  try {
    // get last ten messages
    const messages = await prisma.message.findMany({
      select: {
        message: true,
        sender: {
          select: {
            id: true
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

  return (
    <UserLayout>
      <h1>Chat with the community</h1>

      {
        props.messages.length > 0
        ? <p>{props.messages}</p>
        : <p>No new message</p>
      }
      
      {props.error && <p className={utilsStyles.error}>{props.error}</p>}

      <SendMsg/>
    </UserLayout>
  )
}