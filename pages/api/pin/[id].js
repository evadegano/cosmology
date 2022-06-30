import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
    // get query to fetch a pin by id
    
    const { id } = req.query

    try {
      const pin = await prisma.pin.findFirst({
        where: {
          id: Number(id)
        },
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
      })

      res.status(200).json({ pin })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }

  } else {
    res.status(500).json({ message: 'Method not supported for this API endpoint.'})
  }
}