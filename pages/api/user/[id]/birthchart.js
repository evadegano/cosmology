import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {

  if (req.method === 'GET') {
    const { id } = req.query

    try {
      // search for userId in birthChart model
      const birthChart = await prisma.birthChart.findFirst({
        where: {
          userId: id
        },
        select: {
          sunSign: true,
          moonSign: true,
          risingSign: true,
          northNode: true,
          southNode: true,
          venus: true
        }
      })

      if (birthChart) {
        res.status(200).json({ birthChart })
        return
      }

      res.status(300).json({ message: "You do not have a birth chart yet"})

    } catch(error) {
      res.json(500).json({ message: error })
    }
    
  } else {
    res.status(500).json({ message: `This action with HTTP ${req.method} is not supported.` })
  }
}