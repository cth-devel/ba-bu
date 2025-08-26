'use client';

import ServicesContainer from '@/components/ServicesContainer';
import ServicesLoadingWrapper from '@/components/ui/loading-wrapper';

const ServicesPage = () => {
  return (
    <>
      <div className="sr-only">
        <h1>BA-BU Family Salon - Our Services</h1>
        <p>Explore our comprehensive range of premium beauty and grooming services including wedding packages, hair care, and skin & body treatments.</p>
      </div>

      {/* Responsive container with proper spacing */}
      <div className="min-h-screen w-full">
        <ServicesLoadingWrapper minLoadingTime={2000}>
          <ServicesContainer />
        </ServicesLoadingWrapper>
      </div>
    </>
  );
};

export default ServicesPage;
