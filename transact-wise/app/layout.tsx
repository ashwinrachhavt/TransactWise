import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Transact Wise',
  description: 'A Transaction Analysis Tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><ClerkProvider> {children} </ClerkProvider></body>
    </html>
    
  )
}
