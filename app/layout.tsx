import './globals.css';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import StructuredData from '@/components/StructuredData';
import SmoothScroller from '@/components/SmoothScroller';
import ScrollTriggerRefresh from '@/components/ScrollTriggerRefresh';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://babusalon.com';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.siteName} | Hair, Skin, Bridal & Men's Grooming in North Paravur`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description:
    'Premium family salon in North Paravur, Kerala offering tailored haircuts, hair coloring, facials, bridal makeup, men\'s grooming, and hair spa. Book your salon appointment on WhatsApp today.',
  keywords: [
    'family salon',
    'North Paravur salon',
    'Kerala salon',
    'hair styling',
    'hair coloring',
    'bridal makeup',
    'facial treatments',
    "men's grooming",
    'hair spa',
    'scalp treatments',
    'kids haircuts',
    'book salon appointment',
    'WhatsApp booking',
    'beauty services',
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: siteConfig.siteName,
    title: `${siteConfig.siteName} | Hair, Skin, Bridal & Men's Grooming in North Paravur`,
    description:
      'Premium family salon in North Paravur, Kerala offering tailored haircuts, hair coloring, facials, bridal makeup, men\'s grooming, and hair spa.',
    images: [
      {
        url: `${siteUrl}BABU-White.svg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.siteName} – BA-BU Family Salon`,
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.siteName} | Hair, Skin, Bridal & Men's Grooming in North Paravur`,
    description:
      'Premium family salon in North Paravur, Kerala offering tailored haircuts, hair coloring, facials, bridal makeup, men\'s grooming, and hair spa.',
    images: [`${siteUrl}BABU-White.svg`],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='font-sans overflow-x-hidden antialiased pb-safe'>
        <StructuredData />
        <Header />
        <SmoothScroller />
        <ScrollTriggerRefresh>
          {children}
        </ScrollTriggerRefresh>
        <Footer />
      </body>
    </html>
  );
}
