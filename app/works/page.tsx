'use client';

import WorksContainer from '@/components/WorksContainer';
import ServicesLoadingWrapper from '@/components/ui/loading-wrapper';

const WorksPage = () => {
  return (
    <>
      <div className="sr-only">
        <h1>BA-BU Family Salon - Our Works & Gallery</h1>
        <p>Explore our portfolio of beautiful transformations and stunning beauty work.</p>
      </div>

      {/* Responsive container with proper spacing and optimization */}
      <div className="min-h-screen w-full bg-primary">
        <ServicesLoadingWrapper minLoadingTime={2000}>
          <WorksContainer
            weddingsBackgroundImage="/images/weddings/gallery/wedding-09.webp"
            hairCareBackgroundImage="/images/hair-care/styling/style-13.jpg"
          />
        </ServicesLoadingWrapper>
      </div>
    </>
  );
};

export default WorksPage;