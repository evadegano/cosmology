import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export default async function handler(req, res) {
  /*
    Create user and birthchart instances in the database 
  */

  if (req.method === 'POST') {
    let { id, goals, name, gender, lang, birthDate, birthTime, birthLat, birthLong } = req.body.user
    let { sunSign, moonSign, risingSign, northNode, southNode, venus } = req.body.birthchart

    console.log("goals:", goals);
    console.log("genders:", gender);

    // prep data for db
    name = name.toLowerCase().trim()
    goals = JSON.parse(goals)
    gender = JSON.parse(gender)
    goals = goals.map(goal => {
      return { goal }
    })

    try {
      // add entry to db
      const user = await prisma.user.create({
        data: {
          id,
          name,
          gender: {
            set: gender
          },
          lang: lang.toUpperCase(),
          birthDate,
          birthTime,
          birthLat,
          birthLong,
          birthChart: {
            create: {
              sunSign: sunSign.toUpperCase(),
              moonSign: moonSign.toUpperCase(),
              risingSign: risingSign.toUpperCase(),
              northNode: northNode.toUpperCase(),
              southNode: southNode.toUpperCase(),
              venus: venus.toUpperCase(),
            }
          },
          goals: {
            create: goals
          }
        },
      })

      console.log("User succesfully created in the database.", user)
      res.status(200).json({ user })

    } catch(error) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res.status(500).json({ message: 'Method not supported for this API endpoint.'})
  }
}