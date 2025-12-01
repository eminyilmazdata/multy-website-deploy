import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Multystamps - Coming Soon',
  description: 'Multystamps website is under construction. We\'ll be back soon!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

