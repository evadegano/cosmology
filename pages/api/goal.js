import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let { goals, lang } = req.body

      const newGoals = []

      for (let goal of goals ) {
        let newGoal = await prisma.goal.create({
          data: {
            goal: goal.toLowerCase().trim(),
            lang: lang.toUpperCase()
          }
        })

        newGoals.push(newGoal)
      }

      res.status(200).json({ goals: newGoals })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }

  } else if (req.method === 'GET') {
    const { lang } = req.query

    try {
      const goals = await prisma.goal.findMany({
        where: {
          lang: lang.toUpperCase()
        },
        select: {
          id: true,
          goal: true
        }
      })

      res.status(200).json({ goals })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }

  } else {
    res.status(500).json({ message: 'Method not supported for this API endpoint.'})
  }
}