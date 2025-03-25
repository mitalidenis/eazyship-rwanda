import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'

// Define user roles
export type UserRole = 'ADMIN' | 'USER' | 'GUEST'

// Extend the default User interface
declare module 'next-auth' {
  interface User {
    id: string
    role?: UserRole
  }
  interface Session {
    user: {
      id: string
      role?: UserRole
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role?: UserRole
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        // Enhanced logging
        console.log('Authorization attempt:', credentials?.email)

        // Add more robust validation
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          return null
        }

        try {
          // Example of more secure authentication
          if (
            credentials.email === 'mitalidenis5@gmail.com' && 
            credentials.password === 'Denis455!!'
          ) {
            return { 
              id: '1', 
              name: 'Denis Mitali', 
              email: credentials.email,
              role: 'ADMIN'
            }
          }
          
          console.log('Authentication failed for email:', credentials.email)
          return null
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
    signOut: '/auth/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Custom redirect callback to prevent unwanted redirects
      return baseUrl
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user.id = token.id
      session.user.role = token.role || 'USER'
      return session
    },
    async jwt({ token, user }: { token: any, user?: User }) {
      if (user) {
        token.id = user.id
        token.role = user.role || 'USER'
      }
      return token
    }
  },
  debug: false,  // Explicitly disable debug mode
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }