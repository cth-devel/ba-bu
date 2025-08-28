'use client';

import { siteConfig } from "@/config/site";
import OptimizedHero from "@/components/ui/optimized-hero";
import OptimizedSectionHero from "@/components/ui/optimized-section-hero";
import OptimizedGallery from "@/components/ui/optimized-gallery";
import ServicesContainer from "@/components/ServicesContainer";

const WeddingsServicePage = () => {
  const weddingGalleryImages = [
    { src: '/images/weddings/gallery/wedding-01.jpg', alt: 'Wedding celebration moment 1', title: 'Wedding 01' },
    { src: '/images/weddings/gallery/wedding-02.jpg', alt: 'Wedding celebration moment 2', title: 'Wedding 02' },
    { src: '/images/weddings/gallery/wedding-03.jpg', alt: 'Wedding celebration moment 3', title: 'Wedding 03' },
    { src: '/images/weddings/gallery/wedding-04.jpg', alt: 'Wedding celebration moment 4', title: 'Wedding 04' },
    { src: '/images/weddings/gallery/wedding-05.jpg', alt: 'Wedding celebration moment 5', title: 'Wedding 05' },
    { src: '/images/weddings/gallery/wedding-08.jpg', alt: 'Wedding celebration moment 8', title: 'Wedding 08' },
    { src: '/images/weddings/gallery/wedding-09.webp', alt: 'Wedding celebration moment 9', title: 'Wedding 09' },
    { src: '/images/weddings/gallery/wedding-10.webp', alt: 'Wedding celebration moment 10', title: 'Wedding 10' },
    { src: '/images/weddings/gallery/wedding-11.webp', alt: 'Wedding celebration moment 11', title: 'Wedding 11' },
    { src: '/images/weddings/gallery/wedding-12.webp', alt: 'Wedding celebration moment 12', title: 'Wedding 12' },
    { src: '/images/weddings/gallery/wedding-13.webp', alt: 'Wedding celebration moment 13', title: 'Wedding 13' },
    { src: '/images/weddings/gallery/wedding-14.webp', alt: 'Wedding celebration moment 14', title: 'Wedding 14' },
    { src: '/images/weddings/gallery/wedding-15.webp', alt: 'Wedding celebration moment 15', title: 'Wedding 15' },
    { src: '/images/weddings/gallery/wedding-16.webp', alt: 'Wedding celebration moment 16', title: 'Wedding 16' },
    { src: '/images/weddings/gallery/wedding-17.webp', alt: 'Wedding celebration moment 17', title: 'Wedding 17' },
    { src: '/images/weddings/gallery/wedding-18.webp', alt: 'Wedding celebration moment 18', title: 'Wedding 18' },
  ];
  const bridalServices = [
    {
      id: 1,
      name: "Bridal Makeup",
      description: "Complete bridal makeover with professional makeup, hair styling, and accessories. Includes trial session and touch-ups.",
      price: "₹5,000 - ₹15,000",
      duration: "3-4 hours",
      features: [
        "Professional makeup application",
        "Hair styling and accessories",
        "Trial session included",
        "Touch-up services",
        "Bridal consultation"
      ],
      bgImage: "/images/weddings/bride/bride-01.avif"
    },
    {
      id: 2,
      name: "Hair Styling",
      description: "Specialized bridal hair styling with modern techniques, extensions, and hair accessories.",
      price: "₹800 - ₹3,000",
      duration: "2-3 hours",
      features: [
        "Modern hair styling techniques",
        "Hair extensions (if needed)",
        "Hair accessories included",
        "Hair treatment before styling",
        "Long-lasting hold products"
      ],
      bgImage: "/images/weddings/bride/bride-03.jpg"
    },
    {
      id: 3,
      name: "Pre-wedding Care",
      description: "Comprehensive pre-wedding beauty and wellness packages for the bride.",
      price: "₹2,000 - ₹8,000",
      duration: "Multiple sessions",
      features: [
        "Skin care treatments",
        "Hair care and treatments",
        "Body care and massage",
        "Wellness consultations",
        "Customized care plans"
      ],
      bgImage: "/images/weddings/bride/bride-05.jpg"
    }
  ];

  const groomServices = [
    {
      id: 1,
      name: "Groom Grooming",
      description: "Complete grooming package for the groom including haircut, beard styling, and facial treatments.",
      price: "₹500 - ₹2,000",
      duration: "1-2 hours",
      features: [
        "Professional haircut",
        "Beard trimming and styling",
        "Facial treatment",
        "Hair wash and styling",
        "Grooming consultation"
      ],
      bgImage: "/images/weddings/groom/groom-02.jpg"
    },
    {
      id: 2,
      name: "Pre-wedding Grooming",
      description: "Specialized pre-wedding grooming and wellness packages for the groom.",
      price: "₹1,500 - ₹5,000",
      duration: "Multiple sessions",
      features: [
        "Skin care treatments",
        "Hair care and styling",
        "Beard care and maintenance",
        "Wellness consultations",
        "Customized grooming plans"
      ],
      bgImage: "/images/weddings/groom/groom-05.jpg"
    },
    {
      id: 3,
      name: "Wedding Day Grooming",
      description: "Complete wedding day grooming package with touch-up services.",
      price: "₹800 - ₹2,500",
      duration: "2-3 hours",
      features: [
        "Haircut and styling",
        "Beard grooming",
        "Facial treatment",
        "Touch-up services",
        "Wedding day support"
      ],
      bgImage: "/images/weddings/groom/groom-10.jpg"
    }
  ];

  const packages = [
    {
      name: "Bridal Package",
      price: "₹12,000",
      includes: [
        "Bridal makeup",
        "Hair styling",
        "Premium accessories",
        "Trial session",
        "Touch-up services",
        "Pre-wedding care"
      ]
    },
    {
      name: "Groom Package",
      price: "₹3,500",
      includes: [
        "Groom grooming",
        "Hair styling",
        "Beard care",
        "Pre-wedding treatments",
        "Wedding day support"
      ]
    },
    {
      name: "Complete Wedding Package",
      price: "₹25,000",
      includes: [
        "Bridal makeup and hair",
        "Groom grooming",
        "Premium accessories",
        "Multiple trial sessions",
        "Touch-up services",
        "Pre-wedding care for both",
        "Wedding day support"
      ]
    }
  ];

  return (
    <>
      <div className="sr-only">
        <h1>BA-BU Family Salon - Wedding Services</h1>
        <p>
          Complete bridal makeup, hair styling, and groom grooming
          services for your special day.
        </p>
      </div>

      {/* Hero Section */}
      <OptimizedHero
        title="Wedding Services"
        subtitle="Complete Bridal & Groom Packages"
        backgroundImage="/images/weddings/gallery/wedding-08.jpg"
      />

      {/* Bridal Services Section Header - Responsive */}
      <section className="bridal-section py-12 sm:py-16 lg:py-24 w-full bg-black">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-gunteerz font-black text-white mb-6 sm:mb-8 leading-tight">
            Bridal Services
          </h2>
        </div>
      </section>

      {/* Individual Bridal Service Sections - Responsive */}
      {bridalServices.map((service, index) => (
        <section
          key={service.id}
          className={`service-section relative min-h-screen w-full flex flex-col lg:flex-row items-center overflow-hidden tracking-widest ${
            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          {/* Background Image - Responsive */}
          <div className="w-full lg:w-1/2 relative h-64 sm:h-80 lg:h-screen">
            <div
              className="absolute inset-0 bg-cover bg-center w-full h-full"
              style={{
                backgroundImage: `url('${service.bgImage}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 w-full h-full" />
          </div>

          {/* Content Section - Responsive */}
          <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:px-12 justify-center py-8 sm:py-12 lg:py-16">
            <div className="max-w-full">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-gunteerz font-black text-white mb-4 sm:mb-6 leading-tight">
                  {service.name}
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed font-medium tracking-wide sm:tracking-widest">
                  {service.description}
                </p>
              </div>

              {/* Service Details Card - Responsive */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-2xl border border-white/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-[#77530a]/10 to-[#ffd277]/20 rounded-xl sm:rounded-2xl">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#77530a] mb-2">
                      Duration
                    </div>
                    <div className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium">
                      {service.duration}
                    </div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-[#77530a]/10 to-[#ffd277]/20 rounded-xl sm:rounded-2xl">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#77530a] mb-2">
                      Price
                    </div>
                    <div className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium">
                      {service.price}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Section - Responsive */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-2xl border border-[#ffd277]/20">
                <h4 className="text-xl sm:text-2xl font-bold text-[#77530a] mb-4 sm:mb-6 text-center">
                  What's Included
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {service.features.map(
                    (feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="feature-item relative p-3 sm:p-4 bg-gradient-to-br from-white to-[#ffd277]/5 rounded-xl sm:rounded-2xl border border-[#ffd277]/20 hover:from-[#ffd277]/10 hover:to-white hover:border-[#ffd277]/40 transition-all duration-300 group"
                      >
                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-2 h-2 bg-gradient-to-r from-[#77530a] to-[#ffd277] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="w-2 sm:w-3 h-2 sm:h-3 bg-gradient-to-r from-[#77530a] to-[#ffd277] rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                          <span className="text-gray-800 font-medium text-xs sm:text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* CTA Button - Responsive */}
              <div className="text-center">
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] hover:from-[#8a5f0b] hover:via-[#ffd277] hover:to-[#8a5f0b] text-black px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 rounded-full font-bold transition-all duration-500 text-base sm:text-lg lg:text-xl shadow-2xl hover:shadow-[#ffd277]/25 hover:scale-105 transform w-full sm:w-auto"
                  aria-label={`Book ${service.name} service`}
                >
                  <span className="flex items-center justify-center">
                    Book This Service
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Groom Services Section Header - Responsive */}
      <section className="groom-section py-12 sm:py-16 lg:py-24 w-full bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-gunteerz font-black text-white mb-6 sm:mb-8 leading-tight">
            Groom Services
          </h2>
        </div>
      </section>

      {/* Individual Groom Service Sections - Responsive */}
      {groomServices.map((service, index) => (
        <section
          key={service.id}
          className={`service-section relative min-h-screen w-full flex flex-col lg:flex-row items-center overflow-hidden tracking-widest ${
            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          {/* Background Image - Responsive */}
          <div className="w-full lg:w-1/2 relative h-64 sm:h-80 lg:h-screen">
            <div
              className="absolute inset-0 bg-cover bg-center w-full h-full"
              style={{
                backgroundImage: `url('${service.bgImage}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 w-full h-full" />
          </div>

          {/* Content Section - Responsive */}
          <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
            <div className="max-w-full">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-gunteerz font-black text-white mb-4 sm:mb-6 leading-tight">
                  {service.name}
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed font-medium tracking-wide sm:tracking-widest">
                  {service.description}
                </p>
              </div>

              {/* Service Details Card - Responsive */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-2xl border border-white/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-[#77530a]/10 to-[#ffd277]/20 rounded-xl sm:rounded-2xl">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#77530a] mb-2">
                      Duration
                    </div>
                    <div className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium">
                      {service.duration}
                    </div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-[#77530a]/10 to-[#ffd277]/20 rounded-xl sm:rounded-2xl">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#77530a] mb-2">
                      Price
                    </div>
                    <div className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium">
                      {service.price}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Section - Responsive */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-2xl border border-[#ffd277]/20">
                <h4 className="text-xl sm:text-2xl font-bold text-[#77530a] mb-4 sm:mb-6 text-center">
                  What's Included
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {service.features.map(
                    (feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="feature-item relative p-3 sm:p-4 bg-gradient-to-br from-white to-[#ffd277]/5 rounded-xl sm:rounded-2xl border border-[#ffd277]/20 hover:from-[#ffd277]/10 hover:to-white hover:border-[#ffd277]/40 transition-all duration-300 group"
                      >
                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-2 h-2 bg-gradient-to-r from-[#77530a] to-[#ffd277] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="w-2 sm:w-3 h-2 sm:h-3 bg-gradient-to-r from-[#77530a] to-[#ffd277] rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                          <span className="text-gray-800 font-medium text-xs sm:text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* CTA Button - Responsive */}
              <div className="text-center">
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] hover:from-[#8a5f0b] hover:via-[#ffd277] hover:to-[#8a5f0b] text-black px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 rounded-full font-bold transition-all duration-500 text-base sm:text-lg lg:text-xl shadow-2xl hover:shadow-[#ffd277]/25 hover:scale-105 transform w-full sm:w-auto"
                  aria-label={`Book ${service.name} service`}
                >
                  <span className="flex items-center justify-center">
                    Book This Service
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Packages Section - Responsive */}
      <section className="packages-section py-12 sm:py-16 lg:py-24 w-full bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-gunteerz font-black text-white mb-6 sm:mb-8 leading-tight">
              Wedding Packages
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium px-4 sm:px-0">
              Choose the perfect package for your special day.
              All packages include consultation and trial
              sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`package-card bg-gradient-to-br rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border-2 transition-all duration-300 hover:scale-105 ${
                  index === 2
                    ? "from-[#77530a] via-[#ffd277] to-[#77530a] border-[#ffd277] shadow-2xl"
                    : "from-gray-50 to-gray-100 border-gray-200 shadow-lg"
                }`}
              >
                {index === 2 && (
                  <div className="text-center mb-4 sm:mb-6">
                    <span className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-2xl sm:text-3xl font-gunteerz font-bold text-center mb-4 sm:mb-6">
                  {pkg.name}
                </h3>
                <div className="text-center mb-6 sm:mb-8">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
                    {pkg.price}
                  </span>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                  {pkg.includes.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center text-gray-700"
                    >
                      <span className="w-2 h-2 bg-gradient-to-r from-[#77530a] to-[#ffd277] rounded-full mr-3 sm:mr-4 flex-shrink-0"></span>
                      <span className="font-medium text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="text-center">
                  <a
                    href={siteConfig.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      index === 2
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] hover:from-[#8a5f0b] hover:via-[#ffd277] hover:to-[#8a5f0b] text-black"
                    }`}
                    aria-label={`Book ${pkg.name} package`}
                  >
                    Book Package
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Responsive */}
      <section className="cta-section py-12 sm:py-16 lg:py-24 w-full bg-black text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-gunteerz font-bold mb-6 sm:mb-8 leading-tight">
            Ready for Your Perfect Wedding Look?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed font-medium px-4 sm:px-0">
            Book your wedding services today and let us make your
            special day even more beautiful
          </p>

          {/* Responsive Button Layout */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
              aria-label="Contact us on WhatsApp for wedding services"
            >
              WhatsApp Us
            </a>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="w-full sm:w-auto bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] hover:from-[#8a5f0b] hover:via-[#ffd277] hover:to-[#8a5f0b] text-black px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
              aria-label="Call us for wedding services"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>


      {/* Wedding Gallery Section */}
      <section className="wedding-gallery-section py-12 sm:py-16 lg:py-24 w-full bg-gradient-to-br from-black via-gray-900 to-black">
        {/* <OptimizedSectionHero
          title="Wedding Gallery"
          description="Browse a curated selection of our favorite wedding moments."
        /> */}
        <div className="w-full">
          <OptimizedGallery
            images={weddingGalleryImages}
            title="Our Wedding Gallery"
          />
        </div>
      </section>
      {/* Explore Other Services - Interactive Hero (Hair & Skin) */}
      <ServicesContainer
        serviceSectionsOverride={[
          {
            id: "hair-care",
            title: "Hair Care Services",
            backgroundImage: "/images/hair-care/styling/style-04.avif",
          },
          {
            id: "skin-body-care",
            title: "Skin & Body Care",
            backgroundImage: "/images/engin-akyurt-35NAaB_Nmx8-unsplash.jpg",
          },
        ]}
      />
    </>
  );
};

export default WeddingsServicePage;
