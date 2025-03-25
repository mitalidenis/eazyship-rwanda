import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    // Detailed authentication check
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ 
        error: 'Unauthorized: No active session' 
      }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate input
    if (!body.name || !body.email) {
      return NextResponse.json({ 
        error: 'Name and email are required' 
      }, { status: 400 })
    }

    try {
      // Create a type-safe update object
      const updateData: Prisma.UserUpdateInput = {
        name: body.name,
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.address !== undefined && { address: body.address })
      }

      const updatedUser = await prisma.user.update({
        where: { email: session.user.email },
        data: updateData,
        select: {
          name: true,
          email: true,
          phone: true,
          address: true
        } as Prisma.UserSelect
      })

      return NextResponse.json(updatedUser)
    } catch (dbError) {
      console.error('Database update error:', dbError)
      return NextResponse.json({ 
        error: 'Failed to update profile in database',
        details: dbError instanceof Error ? dbError.message : 'Unknown error'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ 
      error: 'Unexpected error occurred',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}