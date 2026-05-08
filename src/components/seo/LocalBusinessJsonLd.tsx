import { SITE_URL } from '@/config/site';

const description =
  'Садиба «Саблінська» — затишні будинки на природі біля озера. Адреса: Кіровоградська область, Суботцівська ОТГ, с. Шаблине, вул. Набережна, 25. Телефон: +38 (096) 756-60-91.';

export default function LocalBusinessJsonLd() {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${SITE_URL}/#local-business`,
    name: 'Садиба «Саблінська»',
    url: SITE_URL,
    telephone: '+380967566091',
    description,
    image: `${SITE_URL}/og-image.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'вул. Набережна, 25',
      addressLocality: 'с. Шаблине',
      addressRegion: 'Кіровоградська область',
      addressCountry: 'UA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.64697255037962,
      longitude: 32.65566272557383,
    },
    hasMap: 'https://maps.app.goo.gl/h2mxs6s7QH18J79v5',
    sameAs: [
      'https://www.facebook.com/usadbasablinskaya',
      'https://www.instagram.com/sadibasablinska/',
      'https://t.me/+380967566091',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessJsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}
