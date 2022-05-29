import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: 'eva.degano@gmail.com',
        },
      })

      res.status(200).json({ user: "eva" })

    } catch(error) {
      res.status(400).json({ message: error })
    }

  } else if (req.method === 'POST') {
    const { name, email, password, gender, birthYear, birthMonth, birthDay, birthHour, birthMin } = req.body
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          gender,
          birthYear,
          birthMonth,
          birthDay,
          birthHour,
          birthMin
        },
      })

      res.status(200).json({ user })

    } catch(error) {
      res.status(400).json({ message: error })
    }

  } else {
    res.status(500).json({ message: 'Method not supported for this API endpoint.'})
  }
}