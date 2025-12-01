import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Multystamps - Contact',
  description: 'Contact Multystamps - Visit our Delcampe webshop or reach us at info@multystamps.be',
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

