import { withIronSessionApiRoute } from "iron-session/next";
import { PrismaClient } from "@prisma/client";
import { hash } from 'bcrypt'


const prisma = new PrismaClient()


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password, passwordConfirm, gender, birthYear, birthMonth, birthDay, birthHour, birthMin, birthLat, birthLong } = req.body

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
            birthYear,
            birthMonth,
            birthDay,
            birthHour,
            birthMin,
            birthLat,
            birthLong
          },
        })
  
        res.status(200).json({ user })

        // save user in session
        req.session.user = {
          id: user.id,
          admin: true,
        };
        await req.session.save();
        res.send({ ok: true });

        // send activation email to user
  
      } catch(error) {
        res.status(400).json({ message: error })
      }
    })

  } else {
    res.status(500).json({ message: `This action with HTTP ${req.method} is not supported.` })
  }
}