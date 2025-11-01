export interface ServiceImage {
  src: string;
  alt: string;
  title?: string;
}

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  galleryImages: ServiceImage[];
  services: Array<{
    name: string;
    price: string;
    duration: string;
    description: string;
    icon?: string;
  }>;
}

// Centralized image data to reduce duplication
export const serviceImages = {
  cleanup: [
    {
      src: '/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp',
      alt: 'Professional facial cleanup treatment',
      title: 'Basic Cleanup'
    },
    {
      src: '/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp',
      alt: 'Advanced facial cleanup with mask',
      title: 'Premium Cleanup'
    },
    {
      src: '/images/skin-care/emiliano-vittoriosi-qTu9DppC3mM-unsplash.webp',
      alt: 'Luxury facial cleanup treatment',
      title: 'Luxury Cleanup'
    },
    {
      src: '/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp',
      alt: 'Complete facial cleanup package',
      title: 'Complete Package'
    }
  ],
  threading: [
    {
      src: '/images/skin-care/kimia-kazemi-pKImvnIWBZk-unsplash.webp',
      alt: 'Precise eyebrow threading service',
      title: 'Eyebrow Threading'
    },
    {
      src: '/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp',
      alt: 'Upper lip threading treatment',
      title: 'Upper Lip Threading'
    },
    {
      src: '/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash1.webp',
      alt: 'Full face threading service',
      title: 'Full Face Threading'
    },
    {
      src: '/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp',
      alt: 'Professional threading techniques',
      title: 'Professional Threading'
    }
  ],
  bleaching: [
    {
      src: '/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp',
      alt: 'Gentle face bleaching treatment',
      title: 'Face Bleaching'
    },
    {
      src: '/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp',
      alt: 'Full body bleaching service',
      title: 'Body Bleaching'
    },
    {
      src: '/images/skin-care/emiliano-vittoriosi-qTu9DppC3mM-unsplash.webp',
      alt: 'Premium bleaching treatment',
      title: 'Premium Bleaching'
    },
    {
      src: '/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp',
      alt: 'Advanced bleaching techniques',
      title: 'Advanced Bleaching'
    }
  ],
  waxing: [
    {
      src: '/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp',
      alt: 'Professional leg waxing service',
      title: 'Leg Waxing'
    },
    {
      src: '/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp',
      alt: 'Arm waxing treatment',
      title: 'Arm Waxing'
    },
    {
      src: '/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp',
      alt: 'Bikini area waxing service',
      title: 'Bikini Waxing'
    },
    {
      src: '/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash1.webp',
      alt: 'Professional waxing techniques',
      title: 'Professional Waxing'
    }
  ],
  facials: [
    {
      src: '/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp',
      alt: 'Classic facial treatment',
      title: 'Classic Facial'
    },
    {
      src: '/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp',
      alt: 'Anti-aging facial treatment',
      title: 'Anti-Aging Facial'
    },
    {
      src: '/images/skin-care/emiliano-vittoriosi-qTu9DppC3mM-unsplash.webp',
      alt: 'Acne control facial treatment',
      title: 'Acne Control Facial'
    },
    {
      src: '/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp',
      alt: 'Premium facial treatment',
      title: 'Premium Facial'
    }
  ],
  massages: [
    {
      src: '/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp',
      alt: 'Swedish massage therapy',
      title: 'Swedish Massage'
    },
    {
      src: '/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp',
      alt: 'Deep tissue massage therapy',
      title: 'Deep Tissue Massage'
    },
    {
      src: '/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp',
      alt: 'Hot stone massage therapy',
      title: 'Hot Stone Massage'
    },
    {
      src: '/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash1.webp',
      alt: 'Therapeutic massage treatment',
      title: 'Therapeutic Massage'
    }
  ],
  pedicure: [
    {
      src: '/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp',
      alt: 'Basic pedicure service',
      title: 'Basic Pedicure'
    },
    {
      src: '/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp',
      alt: 'Luxury pedicure treatment',
      title: 'Luxury Pedicure'
    },
    {
      src: '/images/skin-care/emiliano-vittoriosi-qTu9DppC3mM-unsplash.webp',
      alt: 'Gel pedicure service',
      title: 'Gel Pedicure'
    },
    {
      src: '/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp',
      alt: 'Premium nail care service',
      title: 'Premium Nail Care'
    }
  ]
};

// Service data with pricing information
export const serviceData = {
  cleanup: {
    id: 'cleanup',
    title: 'Cleanup & Detan',
    description: 'Professional facial cleanup and tan removal treatments for glowing, healthy skin.',
    backgroundImage: '/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp',
    galleryImages: serviceImages.cleanup,
    services: [
      {
        name: "Basic Cleanup",
        price: "₹500",
        duration: "45 min",
        description: "Basic facial cleanup and exfoliation"
      },
      {
        name: "Premium Cleanup",
        price: "₹800",
        duration: "1 hour",
        description: "Advanced cleanup with mask and treatment"
      },
      {
        name: "Luxury Cleanup",
        price: "₹1,200",
        duration: "1.5 hours",
        description: "Complete cleanup with premium products"
      }
    ]
  },
  threading: {
    id: 'threading',
    title: 'Threading Services',
    description: 'Precise hair removal using traditional threading techniques for clean, defined brows and smooth skin.',
    backgroundImage: '/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp',
    galleryImages: serviceImages.threading,
    services: [
      {
        name: "Eyebrow Threading",
        price: "₹100",
        duration: "15 min",
        description: "Precise eyebrow shaping"
      },
      {
        name: "Upper Lip Threading",
        price: "₹80",
        duration: "10 min",
        description: "Clean upper lip hair removal"
      },
      {
        name: "Full Face Threading",
        price: "₹300",
        duration: "30 min",
        description: "Complete facial hair removal"
      }
    ]
  },
  bleaching: {
    id: 'bleaching',
    title: 'Bleaching Services',
    description: 'Professional skin lightening treatments for a brighter, more even complexion.',
    backgroundImage: '/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp',
    galleryImages: serviceImages.bleaching,
    services: [
      {
        name: "Face Bleaching",
        price: "₹400",
        duration: "30 min",
        description: "Gentle face skin lightening"
      },
      {
        name: "Body Bleaching",
        price: "₹800",
        duration: "1 hour",
        description: "Full body skin lightening"
      },
      {
        name: "Premium Bleaching",
        price: "₹1,200",
        duration: "1.5 hours",
        description: "Advanced bleaching with care"
      }
    ]
  },
  waxing: {
    id: 'waxing',
    title: 'Waxing Services',
    description: 'Professional hair removal services for smooth, hair-free skin using premium waxing techniques.',
    backgroundImage: '/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp',
    galleryImages: serviceImages.waxing,
    services: [
      {
        name: "Leg Waxing",
        price: "₹600",
        duration: "45 min",
        description: "Full leg hair removal"
      },
      {
        name: "Arm Waxing",
        price: "₹400",
        duration: "30 min",
        description: "Arm hair removal"
      },
      {
        name: "Bikini Waxing",
        price: "₹800",
        duration: "30 min",
        description: "Bikini area waxing"
      }
    ]
  },
  facials: {
    id: 'facials',
    title: 'Facial Treatments',
    description: 'Rejuvenating facial treatments for all skin types and concerns with professional care.',
    backgroundImage: '/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp',
    galleryImages: serviceImages.facials,
    services: [
      {
        name: "Classic Facial",
        price: "₹800",
        duration: "1 hour",
        description: "Basic cleansing and treatment"
      },
      {
        name: "Anti-Aging Facial",
        price: "₹2,000",
        duration: "1.5 hours",
        description: "Advanced anti-aging treatment"
      },
      {
        name: "Acne Control Facial",
        price: "₹1,500",
        duration: "1.5 hours",
        description: "Specialized acne treatment"
      }
    ]
  },
  massages: {
    id: 'massages',
    title: 'Massage Services',
    description: 'Relaxing and therapeutic massage treatments for ultimate relaxation and wellness.',
    backgroundImage: '/images/mitchell-orr-dcAw8Ms-teQ-unsplash.webp',
    galleryImages: serviceImages.massages,
    services: [
      {
        name: "Swedish Massage",
        price: "₹1,500",
        duration: "1 hour",
        description: "Relaxing full body massage"
      },
      {
        name: "Deep Tissue Massage",
        price: "₹2,000",
        duration: "1 hour",
        description: "Therapeutic deep tissue work"
      },
      {
        name: "Hot Stone Massage",
        price: "₹2,500",
        duration: "1.5 hours",
        description: "Luxury hot stone therapy"
      }
    ]
  },
  pedicure: {
    id: 'pedicure',
    title: 'Pedicure & Manicure',
    description: 'Professional nail care services for beautiful hands and feet with premium treatments.',
    backgroundImage: '/images/baylee-gramling-a3xr2mVjT5M-unsplash.webp',
    galleryImages: serviceImages.pedicure,
    services: [
      {
        name: "Basic Pedicure",
        price: "₹600",
        duration: "45 min",
        description: "Basic foot care and polish"
      },
      {
        name: "Luxury Pedicure",
        price: "₹1,200",
        duration: "1 hour",
        description: "Premium foot care with massage"
      },
      {
        name: "Gel Pedicure",
        price: "₹1,500",
        duration: "1 hour",
        description: "Long-lasting gel polish"
      }
    ]
  }
};
