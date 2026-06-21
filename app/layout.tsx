import type { Metadata, Viewport } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://apple-mdm-academy-v2.vercel.app'),
  title: { default: 'MDM Academy', template: '%s — MDM Academy' },
  description: 'Plateforme de formation professionnelle Apple Enterprise, Jamf Pro, Microsoft Intune et Android Enterprise. 60 cours, 9 modules, 7 certifications.',
  keywords: [
    'Apple MDM', 'Jamf Pro', 'Microsoft Intune', 'Apple Business Manager',
    'Formation IT', 'macOS Management', 'iOS Management', 'Android Enterprise',
    'Jamf School', 'Jamf Connect', 'MDM', 'Mobile Device Management',
    'ADE', 'ABM', 'Zero Touch', 'Certifications Apple', 'Jamf 100', 'MD-102',
  ],
  authors: [{ name: 'MDM Academy' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'MDM Academy',
    title: 'MDM Academy — Formation Apple Enterprise',
    description: 'Plateforme de formation professionnelle Apple Enterprise, Jamf, Intune et Android Enterprise. 60 cours, 9 modules, 7 certifications.',
    url: 'https://apple-mdm-academy-v2.vercel.app',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'MDM Academy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MDM Academy — Formation Apple Enterprise',
    description: 'Formation professionnelle Apple Enterprise, Jamf Pro, Microsoft Intune et Android Enterprise.',
    images: ['/icon-512.png'],
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#080B12',
  width: 'viewport',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#5E6AD2',
          colorBackground: '#0D1117',
          colorNeutral: '#9AA2B4',
          borderRadius: '0.75rem',
        },
      }}
    >
      <html lang="fr" className="scroll-smooth">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap"
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
    </ClerkProvider>
  );
}
