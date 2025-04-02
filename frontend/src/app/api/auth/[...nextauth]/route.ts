import NextAuth, { NextAuthOptions, User as NextAuthUser } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { UserRole } from '@prisma/client'

// Extend User type to include password and role
declare module 'next-auth' {
  interface User {
    id: string
    name?: string
    email?: string
    role?: UserRole
  }

  interface Session {
    user: {
      id: string
      name?: string
      email?: string
      role?: UserRole
    }
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text", optional: true },
        role: { label: "Role", type: "text", optional: true }
      },
      async authorize(credentials, req) {
        console.log('Authorization attempt:', {
          email: credentials?.email,
          role: credentials?.role
        })

        // Validate input
        if (!credentials?.email || !credentials?.password) {
          console.error('Invalid credentials: Missing email or password')
          throw new Error('Invalid credentials')
        }

        try {
          // Check if user exists
          let user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          // If user doesn't exist and a name is provided, create a new user
          if (!user) {
            // If no name is provided during login, throw an error
            if (!credentials.name) {
              console.error('User not found and no name provided')
              throw new Error('User not found. Please sign up first.')
            }

            // Create new user
            const hashedPassword = await bcrypt.hash(credentials.password, 10)
            
            user = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.name,
                password: hashedPassword,
                role: credentials.role === 'admin' ? UserRole.ADMIN : UserRole.USER
              }
            })

            console.log('New user created:', user.email, user.role)
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password, 
            user.password
          )

          if (!isPasswordValid) {
            console.error('Invalid password for user:', user.email)
            throw new Error('Invalid password')
          }

          // Verify role for admin access
          if (credentials.role === 'admin' && user.role !== UserRole.ADMIN) {
            console.error('Non-admin user attempting admin login:', user.email)
            throw new Error('Access denied')
          }

          console.log('Successful login:', user.email, user.role)

          // Return user object for session
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          } as NextAuthUser
        } catch (error) {
          console.error('Authorization error:', error)
          throw error
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.name = user.name
        console.log('JWT token created:', { 
          id: token.id, 
          role: token.role 
        })
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
        session.user.name = token.name as string
        console.log('Session created:', { 
          id: session.user.id, 
          role: session.user.role 
        })
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== 'production'
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }