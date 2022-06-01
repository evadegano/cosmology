import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let { pins } = req.body
      let { id, lang } = req.query

      const newPins = []

      for (let pin of pins ) {
        let goals = pin.goals.map(goal => {
          return { id: goal }
        })

        let types = pin.types.map(type => {
          return { id: type }
        })

        let newPin = await prisma.pin.create({
          data: {
            title: pin.title.toLowerCase().trim(),
            description: pin.description.toLowerCase().trim(),
            pictureUrl: pin.pictureUrl,
            redirection: pin.redirection.toLowerCase().trim(),
            creatorId: { connect: { id }},
            lang,
            gender: pin.gender,
            goals: { connect: goals },
            type: { connect: types },
          }
        })

        newPins.push(newPin)
      }

      res.status(200).json({ pins: newPins })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }

  } else if (req.method === 'GET') {
    // get query to filter pins

    try {
      const pins = await prisma.pin.findMany({
        select: {
          title: true,
          description: true,
          pictureUrl: true,
          redirection: true,
          creatorId: true,
          goals: true,
          type: true,
        }
      })

      res.status(200).json({ pins })

    } catch(err) {
      res.status(500).json({ message: err.message })
    }

  } else {
    res.status(500).json({ message: 'Method not supported for this API endpoint.'})
  }
}