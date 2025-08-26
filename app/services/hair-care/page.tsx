'use client';

import { siteConfig } from "@/config/site";
import { Scissors, Palette } from "lucide-react";
import OptimizedHero from "@/components/ui/optimized-hero";
import OptimizedSectionHero from "@/components/ui/optimized-section-hero";
import OptimizedGallery from "@/components/ui/optimized-gallery";
import OptimizedPricing from "@/components/ui/optimized-pricing";

const HairCareServicePage = () => {
  const hairCutImages = [
    {
      src: '/images/baylee-gramling-a3xr2mVjT5M-unsplash.jpg',
      alt: 'Professional haircut and styling',
      title: 'Basic Haircut'
    },
    {
      src: '/images/engin-akyurt-35NAaB_Nmx8-unsplash.jpg',
      alt: 'Modern hair styling techniques',
      title: 'Stylish Cut'
    },
    {
      src: '/images/jonathan-borba-qJ2mhxmateo-unsplash.jpg',
      alt: 'Premium hair cutting service',
      title: 'Premium Cut'
    },
    {
      src: '/images/sofia-vila-flor-ebNYeZ8SR2o-unsplash.jpg',
      alt: 'Luxury hair styling treatment',
      title: 'Luxury Styling'
    }
  ];

  const hairColorImages = [
    {
      src: '/images/mitchell-orr-dcAw8Ms-teQ-unsplash.jpg',
      alt: 'Professional hair coloring service',
      title: 'Single Color'
    },
    {
      src: '/images/quentin-mahe-mAW3jUP6G6E-unsplash.jpg',
      alt: 'Beautiful hair highlights',
      title: 'Highlights'
    },
    {
      src: '/images/wali-38sbVK-LI1Q-unsplash.jpg',
      alt: 'Hand-painted balayage highlights',
      title: 'Balayage'
    },
    {
      src: '/images/john-arano-CCTCHXEsan8-unsplash.jpg',
      alt: 'Professional color correction',
      title: 'Color Correction'
    }
  ];

  const hairCutServices = [
    {
      name: "Basic Haircut",
      price: "₹300",
      duration: "30-45 min",
      description: "Simple trim and style"
    },
    {
      name: "Stylish Cut",
      price: "₹500",
      duration: "45-60 min",
      description: "Modern cut with styling"
    },
    {
      name: "Premium Cut",
      price: "₹800",
      duration: "60-90 min",
      description: "Luxury cut with consultation"
    }
  ];

  const hairColorServices = [
    {
      name: "Single Color",
      price: "₹1,200",
      duration: "2-3 hours",
      description: "Full hair coloring"
    },
    {
      name: "Highlights",
      price: "₹2,000",
      duration: "3-4 hours",
      description: "Partial highlighting"
    },
    {
      name: "Balayage",
      price: "₹3,500",
      duration: "4-5 hours",
      description: "Hand-painted highlights"
    },
    {
      name: "Color Correction",
      price: "₹4,000",
      duration: "4-6 hours",
      description: "Fix previous color issues"
    }
  ];

  return (
    <>
      <div className="sr-only">
        <h1>BA-BU Family Salon - Hair Care Services</h1>
        <p>Professional hair cutting, styling, coloring, and treatments for all hair types and textures.</p>
      </div>

      {/* Main Hero Section */}
      <OptimizedHero
        title="Hair Care Services"
        subtitle="Professional Hair Styling & Treatments"
        backgroundImage="/images/engin-akyurt-35NAaB_Nmx8-unsplash.jpg"
      />

      {/* Hair Cuts Section */}
      <section className="hair-cuts-section">
        <OptimizedSectionHero
          title="Hair Cuts & Styling"
          description="Transform your look with our expert cutting techniques and modern styling approaches."
        />

        <OptimizedGallery
          images={hairCutImages}
          title="Our Hair Cut Styles"
          description="Browse through our collection of stunning haircuts and styles"
        />

        <OptimizedPricing
          services={hairCutServices}
          title="Hair Cut Pricing"
          description="Transparent pricing for all our hair cutting services"
        />
      </section>

      {/* Hair Coloring Section */}
      <section className="hair-coloring-section">
        <OptimizedSectionHero
          title="Hair Coloring & Highlights"
          description="Transform your hair with our professional coloring services and stunning highlight techniques."
          backgroundClass="bg-gradient-to-br from-gray-900 via-black to-gray-900"
        />

        <OptimizedGallery
          images={hairColorImages}
          title="Our Hair Color Styles"
          description="Explore our collection of beautiful hair colors and highlights"
        />

        <OptimizedPricing
          services={hairColorServices}
          title="Hair Color Pricing"
          description="Competitive pricing for all our hair coloring services"
        />
      </section>

      {/* CTA Section - Responsive Design */}
      <section className="cta-section py-12 sm:py-16 lg:py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-gunteerz font-bold mb-4 sm:mb-6 leading-tight">
            Ready to Transform Your Hair?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4 sm:px-0">
            Book your hair care appointment today and experience the BA-BU difference
          </p>

          {/* Responsive Button Layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 text-base sm:text-lg text-center"
              aria-label="Contact us on WhatsApp for hair care services"
            >
              WhatsApp Us
            </a>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="w-full sm:w-auto bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] hover:from-[#8a5f0b] hover:via-[#ffd277] hover:to-[#8a5f0b] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 text-base sm:text-lg text-center"
              aria-label="Call us for hair care services"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HairCareServicePage;
