import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://babufamilysalon.com';
  
  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/services/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    ...['hair-care', 'skin-body-care', 'weddings'].map((slug) => ({
      url: `${baseUrl}/services/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/gallery/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/aboutus/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  return staticPages;
}
