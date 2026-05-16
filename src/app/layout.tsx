import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

import Header from '@/components/layout/header/Header';
import { SITE_URL } from '@/config/site';
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Садиба «Саблінська» — відпочинок біля озера',
    template: '%s | Садиба «Саблінська»',
  },

  description:
    'Садиба «Саблінська» — затишні будинки на природі біля озера. Адреса: Кіровоградська область, Суботцівська ОТГ, с. Шаблине, вул. Набережна, 25. Телефон: +38 (096) 756-60-91.',

  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: '/',
    siteName: 'Садиба «Саблінська»',
    title: 'Садиба «Саблінська» — відпочинок біля озера',
    description:
      'Садиба «Саблінська» — затишні будинки на природі біля озера. Адреса: Кіровоградська область, Суботцівська ОТГ, с. Шаблине, вул. Набережна, 25. Телефон: +38 (096) 756-60-91.',
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
      'Садиба «Саблінська» — затишні будинки на природі біля озера. Адреса: Кіровоградська область, Суботцівська ОТГ, с. Шаблине, вул. Набережна, 25. Телефон: +38 (096) 756-60-91.',
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-42HDX37NPP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-42HDX37NPP');
          `}
        </Script>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
