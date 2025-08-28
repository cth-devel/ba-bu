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
          '/images/weddings/bride/bride-02.jpg',
          '/images/weddings/groom/groom-02.jpg',
          '/images/weddings/gallery/wedding-01.jpg',
          '/images/weddings/bride/bride-01.avif',
        ],
      },
      {
        id: 'mehendi',
        name: 'Mehendi',
        description: 'An artistic celebration where intricate henna designs are applied to the bride\'s hands and feet.',
        images: [
          '/images/weddings/groom/groom-05.jpg',
          '/images/weddings/gallery/wedding-12.jpg',
          '/images/weddings/groom/groom-10.jpg',
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
          '/images/weddings/gallery/wedding-13.jpg',
          '/images/weddings/gallery/wedding-14.webp',
          '/images/weddings/bride/bride-03.jpg',
          '/images/weddings/bride/bride-01.avif',
          '/images/weddings/groom/groom-08.jpg',
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
  '/images/weddings/gallery/wedding-01.jpg',
  '/images/weddings/gallery/wedding-11.jpg',
  '/images/weddings/bride/bride-02.jpg',
  '/images/weddings/groom/groom-02.jpg',
  '/images/weddings/gallery/wedding-12.webp'
];

// Wedding inspiration board items
export const weddingInspirations = [
  {
    id: '1',
    title: 'Elegant Bridal Makeup',
    category: 'makeup',
    image: '/images/weddings/bride/bride-02.jpg',
    description: 'Natural glam with soft tones and radiant finish for the perfect bridal look'
  },
  {
    id: '2',
    title: 'Traditional Henna Art',
    category: 'mehendi',
    image: '/images/weddings/groom/groom-05.jpg',
    description: 'Intricate henna designs that celebrate cultural traditions and artistry'
  },
  {
    id: '3',
    title: 'Vintage Hair Styling',
    category: 'hairstyling',
    image: '/images/weddings/groom/groom-02.jpg',
    description: 'Classic vintage-inspired hairstyles with modern elegance'
  },
  {
    id: '4',
    title: 'Romantic Wedding Setup',
    category: 'decor',
    image: '/images/weddings/gallery/wedding-01.jpg',
    description: 'Dreamy romantic settings with soft florals and ambient lighting'
  },
  {
    id: '5',
    title: 'Groom Styling',
    category: 'grooming',
    image: '/images/weddings/groom/groom-10.jpg',
    description: 'Sharp and sophisticated grooming for the modern groom'
  },
  {
    id: '6',
    title: 'Bridal Hair Accessories',
    category: 'accessories',
    image: '/images/weddings/bride/bride-01.avif',
    description: 'Beautiful hair accessories to complement your bridal hairstyle'
  },
  {
    id: '7',
    title: 'Natural Bridal Look',
    category: 'makeup',
    image: '/images/weddings/gallery/wedding-12.jpg',
    description: 'Fresh and natural makeup looks for the minimalist bride'
  },
  {
    id: '8',
    title: 'Traditional Ceremonies',
    category: 'ceremony',
    image: '/images/weddings/gallery/wedding-13.jpg',
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
