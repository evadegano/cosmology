import { withIronSessionApiRoute } from 'iron-session/next'
import { PrismaClient } from '@prisma/client'
import { sessionOptions } from '../../../lib/session'
import { compare } from 'bcrypt';


const prisma = new PrismaClient()

export default withIronSessionApiRoute(handler, sessionOptions)

async function handler(req, res) {
  const { email, password } = req.body

  try {
    // search user in database 
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    // send error message if user not found
    if (!user) {
      res.status(400).json({ message: "No account linked to this email address." })
    }

    // send error message if passwords don't match
    compare(password, user.password, function(error, result) {
      if (error | !result) {
        res.status(400).json({ message: "Wrong password." })
      }
    })

    // update user's last seen field
    const updateUser = await prisma.user.update({
      where: {
        email
      },
      data: {
        lastSeenAt: Date.now()
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
}