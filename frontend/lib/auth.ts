import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log('Authorize called with:', credentials)
        
        if (
          credentials?.email === 'mitalidenis5@gmail.com' && 
          credentials?.password === 'Denis455!!'
        ) {
          return { 
            id: '1', 
            name: 'Denis Mitali', 
            email: 'mitalidenis5@gmail.com',
            role: 'ADMIN'
          }
        }
        
        console.log('Authentication failed')
        return null
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id as string
      
      if (token.email === 'mitalidenis5@gmail.com') {
        (session.user as any).role = 'ADMIN'
      }
      
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    }
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false
}