'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { ReactNode, useEffect, useState } from 'react'

export default function SessionProvider({ 
  children 
}: { 
  children: ReactNode 
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  )
}