import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { LeadCaptureProvider } from '@/context/LeadCaptureContext'
import { LeadCaptureModal } from '@/components/LeadCaptureModal'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'MedSpaces | Practice-Ready Clinic Spaces for Doctors in Hyderabad',
  description: 'MedSpaces helps doctors focus on care while we handle everything else — from clinic setup to operations, branding, and patient support. Start, grow, and scale your practice with our fully managed medical spaces in Hyderabad.',
  generator: 'MedSpaces',
  keywords:['clinic space for doctors', 'medical coworking', 'Hyderabad'],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <LeadCaptureProvider>
          {children}
          <LeadCaptureModal />
        </LeadCaptureProvider>
      </body>
    </html>
  )
}
