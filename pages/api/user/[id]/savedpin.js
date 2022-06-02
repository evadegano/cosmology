import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { id, pinid } = req.query
    pinid = Number(pinid)

    try {
      await prisma.savedPin.create({
        data: {
          userId: id,
          pinId: pinid
        }
      })

      res.status(200).json({ saved: 'ok' })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }

  } else if (req.method === 'GET') {
    // get query to filter pins
    const { id } = req.query

    try {
      const pins = await prisma.savedPin.findMany({
        where: {
          userId: id
        },
        select: {
          id: true,
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
              },
              savedBy: {
                select: {
                  userId: true
                }
              },
              likedBy: {
                select: {
                  userId: true
                }
              }
            }
          }
        }
      })

      res.status(200).json({ pins })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }

  } else if (req.method === 'DELETE') {
    let { id, pinid } = req.query
    pinid = Number(pinid)

    try {
      await prisma.savedPin.deleteMany({
        where: {
          userId: id,
          pinId: pinid
        }
      })
      
      res.status(200).json({ unsaved: 'ok' })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }
  }  else {
    res.status(500).json({ message: 'Method not supported for this API endpoint.'})
  }
}