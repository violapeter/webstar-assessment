import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import localFont from 'next/font/local'

const poppins = Poppins({
  variable: '--font-default',
  subsets: ['latin'],
  weight: ['400', '500', '700', '800', '900'],
})

const sfDistantGalaxy = localFont({
  src: './fonts/SfDistantGalaxyAltoutline-e2Bp.ttf',
  variable: '--font-brand-outlined',
  display: 'swap',
})

const starjedi = localFont({
  src: './fonts/Starjedi.ttf',
  variable: '--font-brand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Webstar frontend assessment',
  description: 'An incredibly detailed solution to Webstar frontend assesment',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${sfDistantGalaxy.variable} ${starjedi.variable}`}
      >
        <div className="wrapper">{children}</div>
      </body>
    </html>
  )
}
