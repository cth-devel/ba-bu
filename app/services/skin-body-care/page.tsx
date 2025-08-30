'use client';

import { siteConfig } from "@/config/site";
import OptimizedHero from "@/components/ui/optimized-hero";
import OptimizedSectionHero from "@/components/ui/optimized-section-hero";
import OptimizedGallery from "@/components/ui/optimized-gallery";
import OptimizedPricing from "@/components/ui/optimized-pricing";
import { serviceData } from "@/data/serviceImages";
import ServicesContainer from "@/components/ServicesContainer";

const SkinBodyCareServicePage = () => {
  return (
    <>
      <div className="sr-only">
        <h1>BA-BU Family Salon - Skin & Body Care Services</h1>
        <p>Professional skincare, body treatments, and wellness services for all skin types and concerns.</p>
      </div>

      {/* Hero Section */}
      <OptimizedHero
        title="Skin & Body Care"
        subtitle="Rejuvenating Treatments & Wellness"
        backgroundImage="/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.jpg"
      />

      {/* Cleanup Section */}
      <section className="cleanup-section">
        <OptimizedSectionHero
          title="Cleanup & Detan"
          description="Professional facial cleanup and tan removal treatments for glowing, healthy skin."
        />
        <OptimizedGallery
          images={serviceData.cleanup.galleryImages}
          title="Our Cleanup Styles"
          description="Browse through our collection of effective cleanup treatments"
        />
        <OptimizedPricing
          services={serviceData.cleanup.services}
          title="Cleanup Pricing"
          description="Transparent pricing for all our cleanup services"
        />
      </section>

      {/* Threading Section */}
      <section className="threading-section">
        <OptimizedSectionHero
          title="Threading & Shaping"
          description="Precise eyebrow threading and facial hair removal for perfect shaping and definition."
        />
        <OptimizedGallery
          images={serviceData.threading.galleryImages}
          title="Our Threading Styles"
          description="Explore our collection of precise threading techniques"
        />
        <OptimizedPricing
          services={serviceData.threading.services}
          title="Threading Pricing"
          description="Affordable pricing for all our threading services"
        />
      </section>

      {/* Bleaching Section */}
      <section className="bleaching-section">
        <OptimizedSectionHero
          title="Bleaching & Lightening"
          description="Professional skin lightening and bleaching treatments for even skin tone."
        />
        <OptimizedGallery
          images={serviceData.bleaching.galleryImages}
          title="Our Bleaching Styles"
          description="Browse through our collection of skin lightening treatments"
        />
        <OptimizedPricing
          services={serviceData.bleaching.services}
          title="Bleaching Pricing"
          description="Competitive pricing for all our bleaching services"
        />
      </section>

      {/* Waxing Section */}
      <section className="waxing-section">
        <OptimizedSectionHero
          title="Waxing & Hair Removal"
          description="Professional waxing services for smooth, hair-free skin with long-lasting results."
        />
        <OptimizedGallery
          images={serviceData.waxing.galleryImages}
          title="Our Waxing Styles"
          description="Explore our collection of effective hair removal treatments"
        />
        <OptimizedPricing
          services={serviceData.waxing.services}
          title="Waxing Pricing"
          description="Transparent pricing for all our waxing services"
        />
      </section>

      {/* Facials Section */}
      <section className="facials-section">
        <OptimizedSectionHero
          title="Facial Treatments"
          description="Rejuvenating facial treatments for all skin types and concerns."
        />
        <OptimizedGallery
          images={serviceData.facials.galleryImages}
          title="Our Facial Styles"
          description="Browse through our collection of rejuvenating facial treatments"
        />
        <OptimizedPricing
          services={serviceData.facials.services}
          title="Facial Pricing"
          description="Competitive pricing for all our facial services"
        />
      </section>

      {/* Massages Section */}
      <section className="massages-section">
        <OptimizedSectionHero
          title="Body Massages"
          description="Relaxing body massages and wellness treatments for ultimate relaxation."
        />
        <OptimizedGallery
          images={serviceData.massages.galleryImages}
          title="Our Massage Styles"
          description="Explore our collection of relaxing massage treatments"
        />
        <OptimizedPricing
          services={serviceData.massages.services}
          title="Massage Pricing"
          description="Transparent pricing for all our massage services"
        />
      </section>

      {/* Pedicure Section */}
      <section className="pedicure-section">
        <OptimizedSectionHero
          title="Nail Care & Pedicure"
          description="Professional nail care and pedicure services for beautiful, healthy feet."
        />
        <OptimizedGallery
          images={serviceData.pedicure.galleryImages}
          title="Our Nail Care Styles"
          description="Browse through our collection of nail care treatments"
        />
        <OptimizedPricing
          services={serviceData.pedicure.services}
          title="Nail Care Pricing"
          description="Competitive pricing for all our nail care services"
        />
      </section>

      {/* Responsive CTA Section */}
      <section className="cta-section py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-gunteerz font-bold mb-4 sm:mb-6 leading-tight">
            Ready for Your Transformation?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4 sm:px-0">
            Book your skin and body care appointment today and experience the BA-BU difference
          </p>

          {/* Responsive Button Layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 text-base sm:text-lg text-center"
              aria-label="Contact us on WhatsApp for skin and body care services"
            >
              WhatsApp Us
            </a>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="w-full sm:w-auto bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] hover:from-[#8a5f0b] hover:via-[#ffd277] hover:to-[#8a5f0b] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 text-base sm:text-lg text-center"
              aria-label="Call us for skin and body care services"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Explore Other Services - Interactive Hero (Weddings & Hair) */}
      <ServicesContainer
        serviceSectionsOverride={[
          {
            id: "weddings",
            title: "Wedding Services",
            backgroundImage: "/images/weddings/gallery/wedding-08.jpg",
          },
          {
            id: "hair-care",
            title: "Hair Care Services",
            backgroundImage: "/images/hair-care/styling/style-04.avif",
          },
        ]}
      />
    </>
  );
};

export default SkinBodyCareServicePage;
