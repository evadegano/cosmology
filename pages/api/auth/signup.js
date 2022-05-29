import { withIronSessionApiRoute } from "iron-session/next"
import { PrismaClient, Gender, ZodiacSign } from "@prisma/client"
import { sessionOptions } from '../../../lib/session'
import { hash } from 'bcrypt'


const prisma = new PrismaClient()

const zodiacSign = {

}


export default withIronSessionApiRoute(handler, sessionOptions)

async function handler(req, res) {
  /*
    Create user and birthchart instances in the database 
  */

  if (req.method === 'POST') {
    let { goals, name, email, password, passwordConfirm, gender, birthDate, birthTime, birthLat, birthLong } = req.body.user
    let { sunSign, moonSign, risingSign, northNode, southNode, venus } = req.body.birthchart

    console.log("goals:", goals);
    console.log("genders:", gender);

    // clean data for db
    name = name.toLowerCase().trim()
    email = email.toLowerCase().trim()
    goals = goals.map(goal => {
      return { goal }
    })

    // check email address format
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Please enter a valid email address."});
    }

    // check if email address is in db
    try {
      const user = await prisma.user.findFirst({
        where: {
          email
        }
      })

      if (user) res.status(400).json({ message: 'This email address already belongs to an account.'})

    } catch(error) {
      res.status(400).json({ message: error })
    }

    // make sure both passwords match
    if (password !== passwordConfirm) {
      res.status(400).json({ message: "Your confirmation password doesn't match you password." })
    }

    // check password strength
    const pwdRgex = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,}$/;
    if (!pwdRgex.test(password)) {
      res.status(400).json({ message: "Your password must contain at least 8 characters, one cap letter, one number and one special character." })
    }

    // encrypt password
    hash(password, 10, async function(err, hash) {
      // add entry to db
      try {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hash,
            gender: {
              set: gender 
            },
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

        // save user in session
        req.session.user = {
          id: user.id,
          name: user.name,
        };
        await req.session.save()

        console.log("User succesfully created in the database.", req.session)

        // send activation email to user

        res.status(200).json({ session: req.session.user })

      } catch(error) {
        res.status(500).json({ message: error.message })
      }
    })
  } else {
    res.status(500).json({ message: 'Method not supported for this API endpoint.'})
  }
}