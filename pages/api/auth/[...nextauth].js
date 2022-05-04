import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.NEXT_PUBLIC_EMAIL_SERVER,
      from: process.env.NEXT_PUBLIC_EMAIL_FROM,
      async generateVerificationToken() {
        return "ABC123"
      }
    })
  ],
})