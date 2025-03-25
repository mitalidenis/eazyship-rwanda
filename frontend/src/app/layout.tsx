import { Inter } from 'next/font/google'
import Providers from '../components/Providers'
import LayoutWrapper from './LayoutWrapper'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EazyShip Rwanda - Shipment Tracking & E-commerce Integration',
  description: 'Track your shipments, calculate fees, and manage your e-commerce orders with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}