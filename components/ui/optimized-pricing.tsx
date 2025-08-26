'use client';

import { useRef } from 'react';
import { siteConfig } from "@/config/site";
import { ChevronRight, Clock } from 'lucide-react';

interface PricingService {
  name: string;
  price: string;
  duration: string;
  description: string;
  icon?: React.ReactNode;
}

interface OptimizedPricingProps {
  services: PricingService[];
  title: string;
  description: string;
  className?: string;
}

const OptimizedPricing = ({
  services,
  title,
  description,
  className = '',
}: OptimizedPricingProps) => {
  const pricingRef = useRef<HTMLElement>(null);

  return (
    <section ref={pricingRef} className={`py-12 sm:py-16 lg:py-20 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-gunteerz font-black text-black mb-4 sm:mb-6 leading-tight">
            {title}
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            {description}
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="pricing-card bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] text-black w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                  {service.icon || <Clock className="w-6 h-6 sm:w-8 sm:h-8" />}
                </div>
                <h4 className="text-xl sm:text-2xl font-gunteerz font-bold text-black mb-3 sm:mb-4">
                  {service.name}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  {service.description}
                </p>
                <div className="text-center mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
                    {service.price}
                  </span>
                </div>
                <div className="flex items-center justify-center text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  {service.duration}
                </div>
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] hover:from-[#8a5f0b] hover:via-[#ffd277] hover:to-[#8a5f0b] text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold transition-all duration-300 text-sm sm:text-base inline-flex items-center w-full sm:w-auto justify-center"
                  aria-label={`Book ${service.name} service`}
                >
                  Book Now
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OptimizedPricing;
