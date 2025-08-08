'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '@/config/site';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileSectionRef = useRef<HTMLElement>(null);

  const services = siteConfig.services.map((service, index) => ({
    ...service,
    src: `https://images.pexels.com/photos/399344${index + 1}/pexels-photo-399344${index + 1}.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop`,
  }));

  useEffect(() => {
    const mm = ScrollTrigger.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (!containerRef.current || !sectionRef.current) return;

      const section = sectionRef.current;
      const container = containerRef.current;
      const panels = gsap.utils.toArray(".panel");
      const numPanels = panels.length;

      gsap.set(".content-overlay", { y: 30, opacity: 0 });

      const pin = gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.5,
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
          snap: {
              snapTo: 1 / (numPanels - 1),
              duration: 0.2,
              delay: 0,
              ease: 'power2.inOut'
          },
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel: any) => {
        const overlay = panel.querySelector('.content-overlay');
        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: pin,
          start: 'left center',
          end: 'right center',
          onEnter: () => gsap.to(overlay, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }),
          onLeave: () => gsap.to(overlay, { y: 30, opacity: 0, duration: 0.5, ease: 'power2.in' }),
          onEnterBack: () => gsap.to(overlay, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }),
          onLeaveBack: () => gsap.to(overlay, { y: 30, opacity: 0, duration: 0.5, ease: 'power2.in' }),
        });
      });

      return () => {
        pin.kill();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    });

    mm.add("(max-width: 767px)", () => {
      if (!mobileSectionRef.current) return;
      
      const mobileCards = gsap.utils.toArray(".mobile-service-card");
      mobileCards.forEach((card: any) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach(st => st.kill());
      }
    });

    return () => {
      mm.revert();
    };
  }, [services.length]);

  return (
    <>
      <section id="services-section-desktop" ref={sectionRef} className="relative bg-black overflow-hidden hidden md:block">
        <div id="services-container-desktop" ref={containerRef} className="h-screen w-max flex items-center relative">
          {services.map((service, index) => (
            <div id={`service-panel-desktop-${index}`} key={index} className="panel w-screen h-screen relative flex items-center justify-center">
              <Image
                src={service.src}
                alt={service.name}
                fill
                className="object-cover"
                priority={index < 2}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div id={`service-content-desktop-${index}`} className="content-overlay relative text-white text-center max-w-2xl mx-auto px-4">
                <h2 className="text-5xl lg:text-7xl font-bold font-serif mb-4">{service.name}</h2>
                <p className="text-lg lg:text-xl text-white/80 mb-6">{service.description}</p>
                <button className="text-lg font-semibold border-b-2 border-secondary text-secondary hover:bg-secondary hover:text-black transition-all duration-300 px-4 py-2">
                  Book Now <ArrowRight className="inline-block ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="services-section-mobile" ref={mobileSectionRef} className="md:hidden bg-black py-20">
        <div id="services-header-mobile" className="text-center mb-12 px-4">
            <h2 className="text-4xl font-sans font-extrabold text-white mb-4">Our Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-secondary to-yellow-300 mx-auto"></div>
        </div>
        <div id="services-grid-mobile" className="grid grid-cols-1 gap-8 px-4">
          {services.map((service, index) => (
            <div id={`service-card-mobile-${index}`} key={index} className="mobile-service-card relative h-96 rounded-lg overflow-hidden cursor-pointer group shadow-lg">
              <Image src={service.src} alt={service.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-6">
                <h3 className="text-white text-2xl font-semibold">{service.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
