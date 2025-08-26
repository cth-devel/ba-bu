import { siteConfig } from "@/config/site";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import WhatsAppChat from "@/components/WhatsAppChat";
import ScrollToTop from "@/components/ScrollToTop";
import GalleryPreview from "@/components/GalleryPreview";
import BrandMarquee from "@/components/BrandMarquee";
import ServicesLoadingWrapper from "@/components/ui/loading-wrapper";

export default function Home() {
  return (
    <>
      <div className="sr-only">
        <h1>BA-BU Family Salon - Professional Beauty Services</h1>
        <p>
          Experience the finest beauty and grooming services at BA-BU Family Salon.
          From haircuts to bridal makeup, we provide professional care for all your beauty needs.
        </p>
      </div>

      <ServicesLoadingWrapper minLoadingTime={2000}>
        <main>
          <Hero />
          <About />
          <BrandMarquee />
          <Services />
          <GalleryPreview />
          <Testimonials />
          <Contact />
        </main>
        <WhatsAppChat />
        <ScrollToTop />
      </ServicesLoadingWrapper>
    </>
  );
}
