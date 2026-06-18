import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: { default: 'MDM Academy', template: '%s — MDM Academy' },
  description: 'Plateforme de formation Apple Enterprise, Jamf Pro, Microsoft Intune et Android Enterprise.',
  keywords: ['Apple MDM', 'Jamf Pro', 'Microsoft Intune', 'Apple Business Manager', 'Formation IT', 'macOS Management'],
  authors: [{ name: 'MDM Academy' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'MDM Academy',
    title: 'MDM Academy — Formation Apple Enterprise',
    description: 'Plateforme de formation professionnelle Apple Enterprise, Jamf, Intune et Android Enterprise.',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080B12',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
