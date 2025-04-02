// c:\Users\Admin\CascadeProjects\eazyship-rwanda\frontend\src\types\next-auth.d.ts
import 'next-auth'
import { UserRole } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    id: string
    name?: string | null
    email?: string | null
    role?: UserRole
  }

  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    name?: string | null
    email?: string | null
    role?: UserRole
  }
}