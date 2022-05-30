import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body
    const senderId = req.query.id

    try {    
      // create new message in database
      const newMessageRes = await prisma.message.create({
        data: {
          message,
          senderId: Number(senderId)
        }
      })

      res.status(200).json({ newMessage: newMessageRes })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }

  } else {
    // activate once users will be able to edit messages
    res.status(500).json({ message: `This action with HTTP ${req.method} is not supported.` })
  }
}