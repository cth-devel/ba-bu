export interface Ceremony {
  id: string;
  name: string;
  description: string;
  images: string[];
}

export interface WeddingTradition {
  id: string;
  name: string;
  ceremonies: Ceremony[];
}

export const weddingTraditions: WeddingTradition[] = [
  {
    id: 'hindu',
    name: 'Hindu',
    ceremonies: [
      {
        id: 'haldi',
        name: 'Haldi',
        description: 'A vibrant ceremony where a paste of turmeric is applied to the bride and groom.',
        images: [
          '/images/baylee-gramling-a3xr2mVjT5M-unsplash.jpg',
          '/images/john-arano-CCTCHXEsan8-unsplash.jpg',
          '/images/jonathan-borba-qJ2mhxmateo-unsplash.jpg',
          '/images/sofia-vila-flor-ebNYeZ8SR2o-unsplash.jpg',
        ],
      },
      {
        id: 'mehendi',
        name: 'Mehendi',
        description: 'An artistic celebration where intricate henna designs are applied to the bride\'s hands and feet.',
        images: [
          '/images/mitchell-orr-dcAw8Ms-teQ-unsplash.jpg',
          '/images/quentin-mahe-mAW3jUP6G6E-unsplash.jpg',
          '/images/wali-38sbVK-LI1Q-unsplash.jpg',
        ],
      },
    ],
  },
  {
    id: 'muslim',
    name: 'Muslim',
    ceremonies: [
      {
        id: 'nikah',
        name: 'Nikah',
        description: 'The formal marriage ceremony where the marriage contract is signed.',
        images: [
          '/images/ba-bu-family-salon-ernakulam-h2t14qkf70.avif',
          '/images/ba-bu-family-salon-ernakulam-jq0ppxb1ra.avif',
          '/images/ba-bu-family-salon-ernakulam-mo876rr3ve.avif',
        ],
      },
      {
        id: 'walima',
        name: 'Walima',
        description: 'A grand reception hosted by the groom\'s family to celebrate the union.',
        images: [
          '/images/ba-bu-family-salon-ernakulam-mw0w9iz9vd.webp',
          '/images/ba-bu-family-salon-ernakulam-salons-hdt7xnk5d1.jpg',
        ],
      },
    ],
  },
  {
    id: 'christian',
    name: 'Christian',
    ceremonies: [
      {
        id: 'ceremony',
        name: 'Church Ceremony',
        description: 'The sacred exchange of vows in a church, officiated by a priest.',
        images: [
          '/images/about-img-1.jpg',
          '/images/about-img-2.jpg',
          '/images/engin-akyurt-35NAaB_Nmx8-unsplash.jpg',
          '/images/ba-bu-family-salon-north-paravoor-ernakulam-salons-rt79kzzgtq.avif',
          '/images/sofia-vila-flor-ebNYeZ8SR2o-unsplash.jpg',
        ],
      },
      {
        id: 'reception',
        name: 'Reception',
        description: 'A joyful celebration with dining, dancing, and toasts to the newlyweds.',
        images: [
          '/images/wali-38sbVK-LI1Q-unsplash.jpg',
          '/images/quentin-mahe-mAW3jUP6G6E-unsplash.jpg',
        ],
      },
    ],
  },
];

export const getLayoutForCeremony = (ceremonyId: string, index: number): 'grid' | 'masonry' | 'single' => {
  const layouts: ('grid' | 'masonry' | 'single')[] = ['grid', 'masonry', 'single'];
  return layouts[index % layouts.length];
};

// Featured hero images for the wedding gallery
export const heroGalleryImages = [
  '/images/jonathan-borba-qJ2mhxmateo-unsplash.jpg',
  '/images/baylee-gramling-a3xr2mVjT5M-unsplash.jpg',
  '/images/john-arano-CCTCHXEsan8-unsplash.jpg',
  '/images/sofia-vila-flor-ebNYeZ8SR2o-unsplash.jpg',
  '/images/mitchell-orr-dcAw8Ms-teQ-unsplash.jpg'
];

// Wedding inspiration board items
export const weddingInspirations = [
  {
    id: '1',
    title: 'Elegant Bridal Makeup',
    category: 'makeup',
    image: '/images/baylee-gramling-a3xr2mVjT5M-unsplash.jpg',
    description: 'Natural glam with soft tones and radiant finish for the perfect bridal look'
  },
  {
    id: '2',
    title: 'Traditional Henna Art',
    category: 'mehendi',
    image: '/images/mitchell-orr-dcAw8Ms-teQ-unsplash.jpg',
    description: 'Intricate henna designs that celebrate cultural traditions and artistry'
  },
  {
    id: '3',
    title: 'Vintage Hair Styling',
    category: 'hairstyling',
    image: '/images/john-arano-CCTCHXEsan8-unsplash.jpg',
    description: 'Classic vintage-inspired hairstyles with modern elegance'
  },
  {
    id: '4',
    title: 'Romantic Wedding Setup',
    category: 'decor',
    image: '/images/jonathan-borba-qJ2mhxmateo-unsplash.jpg',
    description: 'Dreamy romantic settings with soft florals and ambient lighting'
  },
  {
    id: '5',
    title: 'Groom Styling',
    category: 'grooming',
    image: '/images/wali-38sbVK-LI1Q-unsplash.jpg',
    description: 'Sharp and sophisticated grooming for the modern groom'
  },
  {
    id: '6',
    title: 'Bridal Hair Accessories',
    category: 'accessories',
    image: '/images/sofia-vila-flor-ebNYeZ8SR2o-unsplash.jpg',
    description: 'Beautiful hair accessories to complement your bridal hairstyle'
  },
  {
    id: '7',
    title: 'Natural Bridal Look',
    category: 'makeup',
    image: '/images/quentin-mahe-mAW3jUP6G6E-unsplash.jpg',
    description: 'Fresh and natural makeup looks for the minimalist bride'
  },
  {
    id: '8',
    title: 'Traditional Ceremonies',
    category: 'ceremony',
    image: '/images/engin-akyurt-35NAaB_Nmx8-unsplash.jpg',
    description: 'Beautiful moments captured during traditional wedding ceremonies'
  }
];

// Layout styles for different traditions
export const getTraditionLayoutStyle = (traditionId: string, index: number): 'hero' | 'split' | 'carousel' | 'mosaic' => {
  const layoutMap: Record<string, 'hero' | 'split' | 'carousel' | 'mosaic'> = {
    'hindu': 'hero',
    'muslim': 'split',
    'christian': 'carousel'
  };

  return layoutMap[traditionId] || 'mosaic';
};
