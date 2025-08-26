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
      src: '/images/baylee-gramling-a3xr2mVjT5M-unsplash.jpg',
      alt: 'Professional facial cleanup treatment',
      title: 'Basic Cleanup'
    },
    {
      src: '/images/engin-akyurt-35NAaB_Nmx8-unsplash.jpg',
      alt: 'Advanced facial cleanup with mask',
      title: 'Premium Cleanup'
    },
    {
      src: '/images/jonathan-borba-qJ2mhxmateo-unsplash.jpg',
      alt: 'Luxury facial cleanup treatment',
      title: 'Luxury Cleanup'
    },
    {
      src: '/images/sofia-vila-flor-ebNYeZ8SR2o-unsplash.jpg',
      alt: 'Complete facial cleanup package',
      title: 'Complete Package'
    }
  ],
  threading: [
    {
      src: '/images/mitchell-orr-dcAw8Ms-teQ-unsplash.jpg',
      alt: 'Precise eyebrow threading service',
      title: 'Eyebrow Threading'
    },
    {
      src: '/images/quentin-mahe-mAW3jUP6G6E-unsplash.jpg',
      alt: 'Upper lip threading treatment',
      title: 'Upper Lip Threading'
    },
    {
      src: '/images/wali-38sbVK-LI1Q-unsplash.jpg',
      alt: 'Full face threading service',
      title: 'Full Face Threading'
    },
    {
      src: '/images/john-arano-CCTCHXEsan8-unsplash.jpg',
      alt: 'Professional threading techniques',
      title: 'Professional Threading'
    }
  ],
  bleaching: [
    {
      src: '/images/baylee-gramling-a3xr2mVjT5M-unsplash.jpg',
      alt: 'Gentle face bleaching treatment',
      title: 'Face Bleaching'
    },
    {
      src: '/images/engin-akyurt-35NAaB_Nmx8-unsplash.jpg',
      alt: 'Full body bleaching service',
      title: 'Body Bleaching'
    },
    {
      src: '/images/jonathan-borba-qJ2mhxmateo-unsplash.jpg',
      alt: 'Premium bleaching treatment',
      title: 'Premium Bleaching'
    },
    {
      src: '/images/sofia-vila-flor-ebNYeZ8SR2o-unsplash.jpg',
      alt: 'Advanced bleaching techniques',
      title: 'Advanced Bleaching'
    }
  ],
  waxing: [
    {
      src: '/images/mitchell-orr-dcAw8Ms-teQ-unsplash.jpg',
      alt: 'Professional leg waxing service',
      title: 'Leg Waxing'
    },
    {
      src: '/images/quentin-mahe-mAW3jUP6G6E-unsplash.jpg',
      alt: 'Arm waxing treatment',
      title: 'Arm Waxing'
    },
    {
      src: '/images/wali-38sbVK-LI1Q-unsplash.jpg',
      alt: 'Bikini area waxing service',
      title: 'Bikini Waxing'
    },
    {
      src: '/images/john-arano-CCTCHXEsan8-unsplash.jpg',
      alt: 'Professional waxing techniques',
      title: 'Professional Waxing'
    }
  ],
  facials: [
    {
      src: '/images/baylee-gramling-a3xr2mVjT5M-unsplash.jpg',
      alt: 'Classic facial treatment',
      title: 'Classic Facial'
    },
    {
      src: '/images/engin-akyurt-35NAaB_Nmx8-unsplash.jpg',
      alt: 'Anti-aging facial treatment',
      title: 'Anti-Aging Facial'
    },
    {
      src: '/images/jonathan-borba-qJ2mhxmateo-unsplash.jpg',
      alt: 'Acne control facial treatment',
      title: 'Acne Control Facial'
    },
    {
      src: '/images/sofia-vila-flor-ebNYeZ8SR2o-unsplash.jpg',
      alt: 'Premium facial treatment',
      title: 'Premium Facial'
    }
  ],
  massages: [
    {
      src: '/images/mitchell-orr-dcAw8Ms-teQ-unsplash.jpg',
      alt: 'Swedish massage therapy',
      title: 'Swedish Massage'
    },
    {
      src: '/images/quentin-mahe-mAW3jUP6G6E-unsplash.jpg',
      alt: 'Deep tissue massage therapy',
      title: 'Deep Tissue Massage'
    },
    {
      src: '/images/wali-38sbVK-LI1Q-unsplash.jpg',
      alt: 'Hot stone massage therapy',
      title: 'Hot Stone Massage'
    },
    {
      src: '/images/john-arano-CCTCHXEsan8-unsplash.jpg',
      alt: 'Therapeutic massage treatment',
      title: 'Therapeutic Massage'
    }
  ],
  pedicure: [
    {
      src: '/images/baylee-gramling-a3xr2mVjT5M-unsplash.jpg',
      alt: 'Basic pedicure service',
      title: 'Basic Pedicure'
    },
    {
      src: '/images/engin-akyurt-35NAaB_Nmx8-unsplash.jpg',
      alt: 'Luxury pedicure treatment',
      title: 'Luxury Pedicure'
    },
    {
      src: '/images/jonathan-borba-qJ2mhxmateo-unsplash.jpg',
      alt: 'Gel pedicure service',
      title: 'Gel Pedicure'
    },
    {
      src: '/images/sofia-vila-flor-ebNYeZ8SR2o-unsplash.jpg',
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
    backgroundImage: '/images/baylee-gramling-a3xr2mVjT5M-unsplash.jpg',
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
    backgroundImage: '/images/mitchell-orr-dcAw8Ms-teQ-unsplash.jpg',
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
    backgroundImage: '/images/baylee-gramling-a3xr2mVjT5M-unsplash.jpg',
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
    backgroundImage: '/images/mitchell-orr-dcAw8Ms-teQ-unsplash.jpg',
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
    backgroundImage: '/images/baylee-gramling-a3xr2mVjT5M-unsplash.jpg',
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
    backgroundImage: '/images/mitchell-orr-dcAw8Ms-teQ-unsplash.jpg',
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
    backgroundImage: '/images/baylee-gramling-a3xr2mVjT5M-unsplash.jpg',
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
