import { withIronSessionApiRoute } from "iron-session/next";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";


const prisma = new PrismaClient()

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    const { email, password } = req.body

    try {
      // search user from database 
      const user = await prisma.user.findFirst({
        where: {
          email
        }
      })

      // send error message if user not found
      if (!user) {
        req.status(400).json({ message: "No account linked to this email address." })
      }

      // send error message if passwords don't match
      compare(password, user.password, function(error, result) {
        if (error | !result) {
          req.status(400).json({ message: "Wrong password." })
        }
      })
      
      // save user in session
      req.session.user = {
        id: user.id,
        name: user.name,
      }

      await req.session.save()

      res.status(200).json({ user: req.session.user })

    } catch(error) {
      res.status(500).json({ message: error.message })
    }
  },
  {
    cookieName: "myapp_cookiename",
    password: process.env.NEXT_PUBLIC_SECRET,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);