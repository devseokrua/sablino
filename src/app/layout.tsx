import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

import Header from '@/components/layout/header/Header';
import ThemeProvider from '@/components/theme/ThemeProvider';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-title',
});

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sablino.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Садиба «Саблінська» — відпочинок біля озера',
    template: '%s | Садиба «Саблінська»',
  },

  description:
    'Садиба «Саблінська» — затишні будинки на природі для сімейного відпочинку, виїздів із друзями та тихих вихідних біля озера.',

  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: '/',
    siteName: 'Садиба «Саблінська»',
    title: 'Садиба «Саблінська» — відпочинок біля озера',
    description:
      'Затишні будинки на природі для сімейного відпочинку, виїздів із друзями та тихих вихідних біля озера.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Садиба «Саблінська» — відпочинок біля озера',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Садиба «Саблінська» — відпочинок біля озера',
    description:
      'Затишні будинки на природі для сімейного відпочинку, виїздів із друзями та тихих вихідних біля озера.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${manrope.variable}`}>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
