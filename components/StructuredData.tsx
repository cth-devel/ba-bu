import { siteConfig } from '@/config/site';

const StructuredData = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://babusalon.com';

  const beautySalon = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: siteConfig.siteName,
    description: siteConfig.description,
    url: siteUrl,
    telephone: siteConfig.contact?.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact?.address,
      addressLocality: 'North Paravur',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
    geo: siteConfig.contact?.mapUrl
      ? { '@type': 'GeoCoordinates', name: siteConfig.siteName }
      : undefined,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '05:30',
        closes: '23:00',
      },
    ],
    priceRange: '₹₹',
    sameAs: [
      siteConfig.social?.instagram,
      siteConfig.social?.facebook,
      siteConfig.social?.google,
    ].filter(Boolean),
    makesOffer: (siteConfig.services || []).map((service: any) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
      },
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR',
        price: service.price?.replace(/[^0-9.]/g, '') || undefined,
      },
    })),
  } as const;

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  } as const;

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What services does BA-BU Family Salon offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'We offer tailored haircuts, hair coloring, facial treatments, bridal makeup, men\'s grooming, hair spa, and scalp treatments in North Paravur, Kerala.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I book an appointment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Book directly on WhatsApp at ${siteConfig.contact?.whatsapp} or call ${siteConfig.contact?.phone}.`,
        },
      },
    ],
  } as const;

  const bundle = [beautySalon, webSite, faq];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(bundle) }}
    />
  );
};

export default StructuredData;

