import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/main/Navbar'
import Footer from '@/components/main/Footer'
import Providers from '@/providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Saint-Médard Handball',
    default: 'Site Officiel | Saint-Médard Handball',
  },
  description: 'Handcrafted with love by ob.it',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} max-w-full m-auto w-full bg-white `}>
        <Providers>
          <nav>
            <Navbar />
          </nav>
          <main className='w-full max-w-6xl py-10 m-auto'>{children}</main>
          <footer>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  )
}
