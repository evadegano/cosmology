import { withIronSessionApiRoute } from "iron-session/next";
import { PrismaClient } from "@prisma/client";
import { hash } from 'bcrypt'


const prisma = new PrismaClient()


export default handler(
  async function signupRoute(req, res) {
    /*
      Create user and birthchart instances in the database 
    */

    const { name, email, password, passwordConfirm, gender, birthDate, birthTime, birthLat, birthLong } = req.body.user
    const { sunSign, moonSign, risingSign, northNode, southNode, venus } = req.body.birthchart

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
            gender,
            birthDate,
            birthTime,
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
            birthLat,
            birthLong
          },
        })

        // save user in session
        req.session.user = {
          id: user.id,
          name: user.name,
        };
        await req.session.save()
        console.log("User succesfully created in the database.")

        // send activation email to user

        res.status(200).json({ session: req.sessions.user })

      } catch(error) {
        res.status(500).json({ message: error.message })
      }
    })
  },
  {
    cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME,
    password: process.env.NEXT_PUBLIC_SECRET,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NEXT_PUBLIC_ENV === "production",
    },
  },
)