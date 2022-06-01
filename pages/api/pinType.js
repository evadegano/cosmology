import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let { types } = req.body

      const newTypes = []

      for (let type of types ) {
        let newType = await prisma.pinType.create({
          data: {
            type: type.toLowerCase().trim(),
          }
        })

        newTypes.push(newType)
      }

      res.status(200).json({ types: newTypes })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }

  } else if (req.method === 'GET') {
    try {
      const types = await prisma.pinType.findMany({
        select: {
          id: true,
          type: true
        }
      })

      res.status(200).json({ types })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }

  } else {
    res.status(500).json({ message: 'Method not supported for this API endpoint.'})
  }
}