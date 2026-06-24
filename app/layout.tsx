import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClerkProviderWrapper from '@/components/providers/ClerkProviderWrapper';
import {
  CloudProgressProvider,
  LocalProgressProvider,
} from '@/components/providers/ProgressProvider';
import { isClerkConfigured, isCloudProgressEnabled } from '@/lib/auth-config';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://mdm-academy.vercel.app'),
  title: { default: 'MDM Academy', template: '%s — MDM Academy' },
  description: 'Plateforme de formation professionnelle Apple Enterprise, Jamf Pro, Microsoft Intune et Android Enterprise. 70 cours, 10 modules, 17 certifications officielles, 12 labs interactifs.',
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
    description: 'Plateforme de formation professionnelle Apple Enterprise, Jamf, Intune et Android Enterprise. 70 cours, 10 modules, 17 certifications officielles, 12 labs interactifs.',
    url: 'https://mdm-academy.vercel.app',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'MDM Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MDM Academy — Formation Apple Enterprise',
    description: 'Formation professionnelle Apple Enterprise, Jamf Pro, Microsoft Intune et Android Enterprise.',
    images: ['/icon-512.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#080B12' },
    { media: '(prefers-color-scheme: light)', color: '#5E6AD2' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const clerkConfigured = isClerkConfigured();
  const cloudProgressEnabled = isCloudProgressEnabled();
  const ProgressProvider = cloudProgressEnabled ? CloudProgressProvider : LocalProgressProvider;
  const content = (
    <>
      <Header authEnabled={clerkConfigured} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {clerkConfigured ? (
          <ClerkProviderWrapper>
            <ProgressProvider>{content}</ProgressProvider>
          </ClerkProviderWrapper>
        ) : (
          <LocalProgressProvider>{content}</LocalProgressProvider>
        )}
      </body>
    </html>
  );
}
