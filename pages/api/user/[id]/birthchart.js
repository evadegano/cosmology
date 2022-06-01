import { PrismaClient } from "@prisma/client"
import genBirthChart from '../../../../services/genBirthChart'


const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // search for userId in birthChart model
      const birthChart = await prisma.birthChart.findFirst({
        where: {
          user: req.params.id
        }
      })

      if (birthChart) {
        res.status(200).json({ birthChart })
      }

      res.status(300).json({ message: "You do not have a birth chart yet"})

    } catch(error) {
      res.json(500).json({ message: error })
    }
    
  } else if (req.method === 'POST') {
    try {
      // search for user birth info
      const user = await prisma.user.findFirst({
        where: {
          id: req.params.id
        }
      })

      // generate birth chart
      const birthChart = genBirthChart(user.birthYear, user.birthMonth, user.birthDay, user.birthHour, user.birthMin, user.birthLat, user.birthLong)

      // add birth chart to database
      const birthChartRes = await prisma.birthChart.create({
        data: {
          user: user.id,
          sunSign: birthChart.sunSign,
          moonSign: birthChart.moonSign,
          risingSign: birthChart.risingSign,
          northNode: birthChart.northNode,
          southNode: birthChart.southNode,
        }
      })

      // link birthchart to user in user schema?

      res.status(200).json({ birthChart: birthChartRes })

    } catch(error) {
      res.status(500).json({ message: error })
    }
    
  } else {
    res.status(500).json({ message: `This action with HTTP ${req.method} is not supported.` })
  }
}