'use client';

import { siteConfig } from "@/config/site";
import OptimizedHero from "@/components/ui/optimized-hero";
import OptimizedGallery from "@/components/ui/optimized-gallery";
import ServicesContainer from "@/components/ServicesContainer";
import { useEffect, useRef } from 'react';
import weddingServicesData from "@/data/weddingServices.json";
import { WhatsAppIcon, PhoneIcon } from "@/components/Icons";

const WeddingsServicePage = () => {
  const serviceGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const serviceGrid = serviceGridRef.current;
    if (!serviceGrid) return;

    const cards = serviceGrid.querySelectorAll('.service-card');

    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const htmlCard = card as HTMLElement;
        const rect = htmlCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const distance = Math.hypot(x - centerX, y - centerY);
        const maxDistance = Math.hypot(centerX, centerY);
        const intensity = Math.max(0, 1 - (distance / maxDistance));

        const relativeX = (x / rect.width) * 100;
        const relativeY = (y / rect.height) * 100;

        htmlCard.style.setProperty('--glow-x', `${relativeX}%`);
        htmlCard.style.setProperty('--glow-y', `${relativeY}%`);
        htmlCard.style.setProperty('--glow-intensity', intensity.toString());
      });
    };

    const handleMouseLeave = () => {
      cards.forEach((card) => {
        const htmlCard = card as HTMLElement;
        htmlCard.style.setProperty('--glow-intensity', '0');
      });
    };

    serviceGrid.addEventListener('mousemove', handleMouseMove);
    serviceGrid.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      serviceGrid.removeEventListener('mousemove', handleMouseMove);
      serviceGrid.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const weddingGalleryImages = weddingServicesData.galleryImages;
  const bridalServices = weddingServicesData.bridalServices;
  const groomServices = weddingServicesData.groomServices;

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
        backgroundImage="/images/weddings/gallery/wedding-08.webp"
      />

      {/* Bridal Services Section Header - Responsive */}
      <section className="bridal-section py-12 sm:py-16 lg:py-24 w-full bg-black">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-gunteerz font-black text-white mb-6 sm:mb-8 leading-tight">
            Bridal Services
          </h2>
          <div className="w-full">
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed font-medium tracking-wide w-full max-w-none">
              Make your wedding day unforgettable with the premium <strong className="text-[#ffd277]">Bridal Packages</strong> from BA-BU Salon. Our experienced professionals provide a complete range of bridal beauty services tailored to enhance your glow and confidence for every event. Enjoy personalized styling, flawless makeup, and luxurious treatments using top-quality products—all designed to keep you feeling and looking radiant.
            </p>
          </div>
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
                <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed font-medium tracking-wide sm:tracking-widest w-full max-w-none">
                  {service.description}
                </p>
              </div>

              {/* Service List Display */}
              {service.isServiceList ? (
                <div className="mb-8">
                  <div className="service-grid" ref={serviceGridRef}>
                    {service.features.map((serviceItem, serviceIndex) => {
                      const [serviceName, price] = serviceItem.split(' – ');
                      return (
                        <div
                          key={serviceIndex}
                          className="service-card"
                          style={{
                            ['--glow-x' as string]: '50%',
                            ['--glow-y' as string]: '50%',
                            ['--glow-intensity' as string]: '0',
                            ['--glow-radius' as string]: '200px'
                          } as React.CSSProperties}
                        >
                          <div className="service-card__content">
                            <h3 className="service-card__title !font-sans">{serviceName}</h3>
                            <p className="service-card__price !font-sans">{price}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <>
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
                </>
              )}

              {/* CTA Button - Responsive */}
              <div className="text-center">
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto golden-gradient-button text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 text-base sm:text-lg text-center shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wider inline-flex items-center justify-center gap-2"
                  aria-label={`Book ${service.name} service`}
                >
                  Book This Service
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Bridal Services Booking Message */}
      <section className="py-4 sm:py-6 lg:py-8 w-full bg-gradient-to-r from-[#77530a] to-[#ffd277]">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-full">
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-black font-medium tracking-wide whitespace-nowrap overflow-hidden">
              Book your full bridal package or individual services at BA-BU Salon for a stress-free, luxurious bridal beauty experience.
            </p>
          </div>
        </div>
      </section>

       {/* Groom Services Section Header - Responsive */}
       <section className="groom-section py-12 sm:py-16 lg:py-24 w-full bg-black">
         <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-gunteerz font-black text-white mb-6 sm:mb-8 leading-tight">
             Groom Services
           </h2>
           <div className="w-full">
             <p className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed font-medium tracking-wide w-full max-w-none">
               Look your best on your big day with the exclusive <strong className="text-[#ffd277]">Groom Package</strong> at BA-BU Salon. Our expert team provides a complete grooming experience for men, designed to refresh, style, and enhance your look for your wedding and related events. Enjoy personalized care, modern styling, and effective treatments with premium products for a confident appearance.
             </p>
           </div>
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
           <div className="w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:px-12 justify-center py-8 sm:py-12 lg:py-16">
             <div className="max-w-full">
               <div className="mb-6 sm:mb-8">
                 <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-gunteerz font-black text-white mb-4 sm:mb-6 leading-tight">
                   {service.name}
                 </h3>
                 <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed font-medium tracking-wide sm:tracking-widest w-full max-w-none">
                   {service.description}
                 </p>
               </div>

               {/* Service List Display */}
               {service.isServiceList ? (
                 <div className="mb-8">
                   <div className="service-grid" ref={serviceGridRef}>
                     {service.features.map((serviceItem, serviceIndex) => {
                       const [serviceName, price] = serviceItem.split(' – ');
                       return (
                         <div
                           key={serviceIndex}
                           className="service-card"
                           style={{
                             ['--glow-x' as string]: '50%',
                             ['--glow-y' as string]: '50%',
                             ['--glow-intensity' as string]: '0',
                             ['--glow-radius' as string]: '200px'
                           } as React.CSSProperties}
                         >
                          <div className="service-card__content">
                            <h3 className="service-card__title !font-sans">{serviceName}</h3>
                            <p className="service-card__price !font-sans">{price}</p>
                          </div>
                         </div>
                       );
                     })}
                   </div>
                 </div>
               ) : (
                 <>
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
                 </>
               )}

               {/* CTA Button - Responsive */}
               <div className="text-center">
                 <a
                   href={siteConfig.contact.whatsapp}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group w-full sm:w-auto golden-gradient-button text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 text-base sm:text-lg text-center shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wider inline-flex items-center justify-center gap-2"
                   aria-label={`Book ${service.name} service`}
                 >
                   Book This Service
                   <svg
                     className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
                 </a>
               </div>
             </div>
           </div>
        </section>
       ))}

       {/* Groom Services Booking Message */}
       <section className="py-4 sm:py-6 lg:py-8 w-full bg-gradient-to-r from-[#77530a] to-[#ffd277]">
         <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
           <div className="w-full">
             <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-black font-medium tracking-wide whitespace-nowrap overflow-hidden">
               Book your complete groom package or individual services at BA-BU Salon for a confident, stylish wedding day look.
             </p>
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
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg text-center hover:bg-green-700 tracking-wider flex items-center justify-center gap-2"
              aria-label="Contact us on WhatsApp for wedding services"
            >
              <WhatsAppIcon />
              WhatsApp Us
            </a>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="w-full sm:w-auto golden-gradient-button text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 text-base sm:text-lg text-center shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wider flex items-center justify-center gap-2"
              aria-label="Call us for wedding services"
            >
              <PhoneIcon />
              Call Now
            </a>
          </div>
        </div>
      </section>


      {/* Wedding Gallery Section */}
      <section className="wedding-gallery-section py-12 sm:py-16 lg:py-24 w-full bg-black">
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
            backgroundImage: "/images/engin-akyurt-35NAaB_Nmx8-unsplash.webp",
          },
        ]}
      />
    </>
  );
};

export default WeddingsServicePage;
