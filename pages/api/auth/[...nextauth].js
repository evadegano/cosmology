import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { compare } from 'bcrypt'


const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: {  label: "Password", type: "password" }
      },
      
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.username
          }
        })

        if (user) {
          compare(credentials.password, user.password, function(err, result) {
            if (!err && result) {
              return user
            }
            
            return null
          })
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
      }

      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }

      return session
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  jwt: {
    secret: process.env.NEXT_PUBLIC_SECRET,
    encryption: true,
  },
  session: {
    jwt: true,
  },

  debug: true,
})