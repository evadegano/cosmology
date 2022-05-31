import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query

    try {
      const user = await prisma.user.findFirst({
        where: {
          id
        },
        select: {
          name: true,
        }
      })

      res.status(200).json({ user })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }

  } else {
    res.status(500).json({ message: 'Method not supported for this API endpoint.'})
  }
}