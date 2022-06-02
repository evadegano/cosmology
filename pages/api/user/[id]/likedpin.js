import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { id, pinid } = req.query
    pinid = Number(pinid)

    try {
      await prisma.likedPin.create({
        data: {
          userId: id,
          pinId: pinid
        }
      })

      res.status(200).json({ liked: 'ok' })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }

  } else if (req.method === 'GET') {
    // get query to filter pins
    const { id } = req.query

    try {
      const likedPins = await prisma.likedPin.findMany({
        where: {
          userId: id
        },
        select: {
          id: true,
          userId: true,
          pin: {
            select: {
              id: true,
              title: true,
              description: true,
              pictureUrl: true,
              redirection: true,
              creatorId: true,
              goals: {
                select: {
                  goal: true
                }
              },
              types: {
                select: { 
                  type: true 
                }
              }
            }
          }
        }
      })

      res.status(200).json({ likedPins })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }

  } else if (req.method === 'DELETE') {
    let { id, pinid } = req.query
    pinid = Number(pinid)

    try {
      await prisma.likedPin.deleteMany({
        where: {
          userId: id,
          pinId: pinid
        }
      })
      
      res.status(200).json({ disliked: 'ok' })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }

  } else {
    res.status(500).json({ message: 'Method not supported for this API endpoint.'})
  }
}