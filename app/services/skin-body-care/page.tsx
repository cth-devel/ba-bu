'use client';

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import OptimizedHero from "@/components/ui/optimized-hero";
import OptimizedSectionHero from "@/components/ui/optimized-section-hero";
import OptimizedGallery from "@/components/ui/optimized-gallery";
import OptimizedPricing from "@/components/ui/optimized-pricing";
import ServicesContainer from "@/components/ServicesContainer";

// Completely Static Card Component (no animations)
const ExpandableSkinCareCards = ({ cards, gender = 'female', onBookNow }: { cards: any[], gender?: 'male' | 'female' | 'unisex', onBookNow: (title: string, price: string, gender: string) => void }) => {
  const [active, setActive] = useState<any | null>(null);

  const handleCardClick = (card: any) => {
    console.log('Card clicked:', card.title);
    setActive(card);
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
    setActive(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <>
      {/* Modal Overlay - Completely Static */}
      {active && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Modal Content */}
            <div className="relative">
              <img
                src={active.src}
                alt={active.title}
                className="w-full h-64 object-cover"
              />
              {/* Gender Symbol */}
              {gender === 'female' ? (
                <div className="absolute top-4 right-16 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 14v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 18h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              ) : gender === 'male' ? (
                <div className="absolute top-4 right-16 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <img 
                    src="/men.svg" 
                    alt="Male symbol" 
                    className="w-5 h-5 filter brightness-0 invert"
                  />
                </div>
              ) : null}
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{active.title}</h3>
                  <p className="text-gray-600 mb-2">{active.description}</p>
                  <div className="text-3xl font-bold text-gray-800">{active.price}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookNow(active.title, active.price, gender);
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] text-black font-bold rounded-full hover:opacity-90 transition-all duration-300 min-w-[120px]"
                >
                  {active.ctaText}
                </button>
              </div>
              
              <div className="text-gray-600">
                {typeof active.content === "function" ? active.content() : active.content}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cards List - Completely Static */}
      <div className="w-full space-y-3">
        {cards.map((card, index) => (
          <div
            key={`card-${card.title}-${index}`}
            onClick={() => handleCardClick(card)}
            className="p-4 flex flex-row justify-between items-center hover:bg-gray-800 rounded-xl cursor-pointer border border-gray-700 shadow-sm hover:shadow-md bg-gradient-to-r from-gray-900 to-gray-800"
          >
            <div className="flex gap-4 items-center">
              <div className="relative">
                <img
                  width={80}
                  height={80}
                  src={card.src}
                  alt={card.title}
                  className="h-20 w-20 rounded-lg object-cover object-top"
                />
                {/* Gender Symbol */}
                {gender === 'female' ? (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 14v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 18h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                ) : gender === 'male' ? (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <img 
                      src="/men.svg" 
                      alt="Male symbol" 
                      className="w-4 h-4 filter brightness-0 invert"
                    />
                  </div>
                ) : null}
              </div>
              <div>
                <h3 className="font-medium text-white text-xl font-gunteerz">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-base">
                  {card.description}
                </p>
                <div className="text-2xl font-semibold text-white mt-1">
                  {card.price}
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookNow(card.title, card.price, gender);
              }}
              className="px-8 py-4 text-base rounded-full font-bold bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] hover:from-[#8a5f0b] hover:via-[#ffd277] hover:to-[#8a5f0b] text-black transition-all duration-300 min-w-[120px]"
            >
              {card.ctaText}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

// Booking Popup Component
const BookingPopup = ({ isOpen, onClose, serviceDetails }: { 
  isOpen: boolean, 
  onClose: () => void, 
  serviceDetails: { title: string, price: string, gender: string } | null 
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState('');

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !customerName) {
      alert('Please fill in all required fields');
      return;
    }

    // Create booking details
    const bookingDetails = {
      service: serviceDetails?.title,
      price: serviceDetails?.price,
      date: selectedDate,
      time: selectedTime,
      name: customerName
    };

    // Create the detailed message format (restored from original)
    const message = `Hi! I would like to book an appointment for:

Service: ${bookingDetails.service}
Price: ${bookingDetails.price}
Category: ${serviceDetails?.gender === 'female' ? 'Ladies' : serviceDetails?.gender === 'male' ? 'Gents' : 'Unisex'} Services

Appointment Details:
Date: ${bookingDetails.date}
Time: ${bookingDetails.time}

Customer Details:
Name: ${bookingDetails.name}

Please confirm my appointment. Thank you!`;
    
    // Try different WhatsApp approaches
    const phoneNumber = "919846272333";
    
    // Method 1: Try WhatsApp Web API (more reliable)
    const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    // Method 2: Traditional wa.me URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    console.log('Trying WhatsApp Web URL:', whatsappWebUrl);
    console.log('Fallback wa.me URL:', whatsappUrl);
    
    // Try WhatsApp Web first (more reliable)
    try {
      const newWindow = window.open(whatsappWebUrl, '_blank', 'noopener,noreferrer');
      
      if (!newWindow || newWindow.closed) {
        // Fallback to wa.me in new tab
        console.log('WhatsApp Web failed, trying wa.me in new tab');
        const waWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        
        if (!waWindow || waWindow.closed) {
          // If both fail, show clipboard option
          console.log('Both WhatsApp methods failed, showing clipboard option');
          const fullMessage = `Booking Request:
Service: ${bookingDetails.service}
Price: ${bookingDetails.price}
Date: ${bookingDetails.date}
Time: ${bookingDetails.time}
Name: ${bookingDetails.name}

Please send this message to +91 9846272333 on WhatsApp.`;
          
          if (navigator.clipboard) {
            navigator.clipboard.writeText(fullMessage).then(() => {
              alert('WhatsApp couldn\'t open automatically.\n\nBooking details copied to clipboard!\n\nPlease open WhatsApp and send the copied message to +91 9846272333\n\nOr call us directly at +91 9846272333');
            });
          } else {
            alert(`WhatsApp couldn't open automatically.\n\nPlease send this message to +91 9846272333 on WhatsApp:\n\n${fullMessage}\n\nOr call us directly at +91 9846272333`);
          }
        }
      }
    } catch (error) {
      console.error('Error opening WhatsApp Web:', error);
      
      // Fallback to wa.me in new tab
      try {
        const waWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        
        if (!waWindow || waWindow.closed) {
          // If both fail, show clipboard option
          const fullMessage = `Booking Request:
Service: ${bookingDetails.service}
Price: ${bookingDetails.price}
Date: ${bookingDetails.date}
Time: ${bookingDetails.time}
Name: ${bookingDetails.name}

Please send this message to +91 9846272333 on WhatsApp.`;
          
          if (navigator.clipboard) {
            navigator.clipboard.writeText(fullMessage).then(() => {
              alert('WhatsApp couldn\'t open automatically.\n\nBooking details copied to clipboard!\n\nPlease open WhatsApp and send the copied message to +91 9846272333\n\nOr call us directly at +91 9846272333');
            });
          } else {
            alert(`WhatsApp couldn't open automatically.\n\nPlease send this message to +91 9846272333 on WhatsApp:\n\n${fullMessage}\n\nOr call us directly at +91 9846272333`);
          }
        }
      } catch (waError) {
        console.error('Error with wa.me:', waError);
        
        // Last resort: Copy to clipboard and show instructions
        const fullMessage = `Booking Request:
Service: ${bookingDetails.service}
Price: ${bookingDetails.price}
Date: ${bookingDetails.date}
Time: ${bookingDetails.time}
Name: ${bookingDetails.name}

Please send this message to +91 9846272333 on WhatsApp.`;
        
        if (navigator.clipboard) {
          navigator.clipboard.writeText(fullMessage).then(() => {
            alert('WhatsApp couldn\'t open automatically.\n\nBooking details copied to clipboard!\n\nPlease open WhatsApp and send the copied message to +91 9846272333\n\nOr call us directly at +91 9846272333');
          });
        } else {
          alert(`WhatsApp couldn't open automatically.\n\nPlease send this message to +91 9846272333 on WhatsApp:\n\n${fullMessage}\n\nOr call us directly at +91 9846272333`);
        }
      }
    }
    
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-hidden relative shadow-2xl border border-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-200"
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Appointment</h3>
            <p className="text-gray-600 mb-3">Service: {serviceDetails?.title}</p>
            <div className="bg-gray-50 rounded-xl p-3 inline-block">
              <p className="text-xl font-bold text-gray-800">{serviceDetails?.price}</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Your Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#77530a] focus:border-[#77530a] transition-all duration-200 text-lg"
                placeholder="Enter your full name"
              />
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Date *
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#77530a] focus:border-[#77530a] transition-all duration-200 text-lg"
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Time *
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#77530a] focus:border-[#77530a] transition-all duration-200 text-lg"
              >
                <option value="">Choose a time slot</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 text-gray-600 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] text-black font-bold rounded-xl hover:from-[#8a5f0b] hover:via-[#ffd277] hover:to-[#8a5f0b] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            📱 WhatsApp
          </button>
        </div>
        
        {/* Call Now Button */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3 font-medium">Or call us directly:</p>
          <a
            href="tel:+919846272333"
            className="inline-flex items-center justify-center w-full px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            📞 Call Now
          </a>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

const SkinBodyCareServicePage = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{ title: string, price: string, gender: string } | null>(null);

  const handleBookNow = (title: string, price: string, gender: string) => {
    setSelectedService({ title, price, gender });
    setIsBookingOpen(true);
  };

  const skinCareImages = [
    {
      src: '/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp',
      alt: 'Professional skin care treatment',
      title: 'Facial Treatment'
    },
    {
      src: '/images/skin-care/kimia-kazemi-pKImvnIWBZk-unsplash.webp',
      alt: 'Skin rejuvenation therapy',
      title: 'Skin Rejuvenation'
    },
    {
      src: '/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp',
      alt: 'Premium skincare service',
      title: 'Premium Skincare'
    },
    {
      src: '/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp',
      alt: 'Luxury skin treatment',
      title: 'Luxury Treatment'
    }
  ];

  // Cleanup & Detan Cards for Ladies
  const ladiesCleanupCards = [
    {
      title: "Basic Cleanup",
      description: "Essential facial cleanup for fresh, clean skin",
      price: "₹400",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Basic Cleanup service provides essential facial cleansing to remove impurities, blackheads, and dead skin cells for fresh, clean skin.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Deep pore cleansing</li>
            <li>Blackhead removal</li>
            <li>Dead skin exfoliation</li>
            <li>Skin toning and moisturizing</li>
          </ul>
        </div>
      )
    },
    {
      title: "Advanced Cleanup",
      description: "Comprehensive facial cleanup with premium products",
      price: "₹500",
      src: "/images/skin-care/kimia-kazemi-pKImvnIWBZk-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Advanced Cleanup service includes everything in Basic Cleanup plus premium products and additional treatments for superior results.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Advanced pore cleansing</li>
            <li>Premium exfoliation</li>
            <li>Deep cleansing mask</li>
            <li>Hydrating treatment</li>
            <li>Skin analysis included</li>
          </ul>
        </div>
      )
    },
    {
      title: "De-Tan Basic",
      description: "Basic tan removal treatment for even skin tone",
      price: "₹400",
      src: "/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Basic De-Tan service helps remove tan and restore your natural skin tone using gentle, effective products.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Tan removal treatment</li>
            <li>Skin brightening</li>
            <li>Even skin tone</li>
            <li>Gentle on skin</li>
          </ul>
        </div>
      )
    },
    {
      title: "Advanced De-Tan",
      description: "Premium tan removal with advanced techniques",
      price: "₹500",
      src: "/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Advanced De-Tan service uses premium products and advanced techniques for superior tan removal and skin brightening.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Advanced tan removal</li>
            <li>Premium brightening agents</li>
            <li>Deep skin renewal</li>
            <li>Long-lasting results</li>
            <li>Skin protection included</li>
          </ul>
        </div>
      )
    },
    {
      title: "De-Tan Neck",
      description: "Specialized tan removal treatment for neck area",
      price: "₹400",
      src: "/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our De-Tan Neck service specifically targets the neck area to remove tan and restore even skin tone for a seamless, natural look.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Neck-specific tan removal</li>
            <li>Gentle treatment for sensitive area</li>
            <li>Even skin tone restoration</li>
            <li>Professional application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Under Arms",
      description: "Specialized treatment for underarm area",
      price: "₹200",
      src: "/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Under Arms service provides specialized treatment for the underarm area, ensuring smooth, clean, and well-maintained skin.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Underarm area treatment</li>
            <li>Gentle cleansing and care</li>
            <li>Smooth skin results</li>
            <li>Professional hygiene standards</li>
          </ul>
        </div>
      )
    },
    {
      title: "Feet",
      description: "Comprehensive foot care and treatment",
      price: "₹300",
      src: "/images/skin-care/emiliano-vittoriosi-qTu9DppC3mM-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Feet service provides comprehensive foot care including cleansing, exfoliation, and treatment for soft, healthy feet.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Complete foot cleansing</li>
            <li>Dead skin exfoliation</li>
            <li>Foot moisturizing</li>
            <li>Professional foot care</li>
          </ul>
        </div>
      )
    }
  ];

  // Cleanup & Detan Cards for Gents
  const gentsCleanupCards = [
    {
      title: "Normal Clean Up",
      description: "Essential facial cleanup for men",
      price: "₹350",
      src: "/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Normal Clean Up service for men provides essential facial cleansing to remove impurities and refresh the skin.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Deep facial cleansing</li>
            <li>Impurity removal</li>
            <li>Skin refreshing</li>
            <li>Quick and efficient</li>
          </ul>
        </div>
      )
    },
    {
      title: "Normal De-Tan",
      description: "Basic tan removal treatment for men",
      price: "₹400",
      src: "/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Normal De-Tan service for men helps remove tan and restore natural skin tone using effective, gentle products.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Tan removal treatment</li>
            <li>Skin brightening</li>
            <li>Natural skin restoration</li>
            <li>Men-friendly products</li>
          </ul>
        </div>
      )
    },
    {
      title: "Advanced Cleanup",
      description: "Comprehensive facial cleanup for men",
      price: "₹500",
      src: "/images/skin-care/emiliano-vittoriosi-qTu9DppC3mM-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Advanced Cleanup service for men includes comprehensive facial treatment with premium products for superior results.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Advanced facial cleansing</li>
            <li>Premium products</li>
            <li>Deep pore treatment</li>
            <li>Skin conditioning</li>
            <li>Professional consultation</li>
          </ul>
        </div>
      )
    },
    {
      title: "Advanced De-Tan",
      description: "Premium tan removal for men",
      price: "₹500",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash1.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Advanced De-Tan service for men uses premium products and advanced techniques for superior tan removal and skin brightening.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Advanced tan removal</li>
            <li>Premium brightening</li>
            <li>Deep skin renewal</li>
            <li>Long-lasting results</li>
            <li>Men-specific treatment</li>
          </ul>
        </div>
      )
    }
  ];

  // Facials Cards - Applicable for both male and female
  const facialsCards = [
    {
      title: "Normal Facial",
      description: "Basic facial treatment for clean, refreshed skin",
      price: "₹600",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Normal Facial provides essential skin care treatment including cleansing, exfoliation, and moisturizing for clean, refreshed skin.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Deep skin cleansing</li>
            <li>Gentle exfoliation</li>
            <li>Skin moisturizing</li>
            <li>Basic skin care routine</li>
          </ul>
        </div>
      )
    },
    {
      title: "VLCC Fruit Facial",
      description: "Refreshing fruit-based facial treatment",
      price: "₹900",
      src: "/images/skin-care/kimia-kazemi-pKImvnIWBZk-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our VLCC Fruit Facial uses natural fruit extracts to refresh and rejuvenate your skin with vitamin-rich nutrients.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Natural fruit extracts</li>
            <li>Vitamin-rich nutrients</li>
            <li>Skin refreshing treatment</li>
            <li>VLCC premium products</li>
          </ul>
        </div>
      )
    },
    {
      title: "VLCC Pearl Facial",
      description: "Luxurious pearl-based facial for radiant skin",
      price: "₹1000",
      src: "/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our VLCC Pearl Facial combines the luxury of pearl extracts with advanced skincare technology for radiant, glowing skin.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Pearl extract benefits</li>
            <li>Radiant skin enhancement</li>
            <li>Luxury treatment experience</li>
            <li>Advanced skincare technology</li>
          </ul>
        </div>
      )
    },
    {
      title: "VLCC Gold Facial",
      description: "Premium gold facial for ultimate luxury",
      price: "₹1100",
      src: "/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our VLCC Gold Facial offers the ultimate luxury experience with gold-infused treatments for premium skin care results.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Gold-infused treatment</li>
            <li>Ultimate luxury experience</li>
            <li>Premium skin care</li>
            <li>Anti-aging benefits</li>
          </ul>
        </div>
      )
    },
    {
      title: "Natures Gold Facial",
      description: "Natural gold facial with organic ingredients",
      price: "₹1500",
      src: "/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Natures Gold Facial combines natural gold extracts with organic ingredients for a pure, luxurious skin treatment.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Natural gold extracts</li>
            <li>Organic ingredients</li>
            <li>Pure luxury treatment</li>
            <li>Natural skin enhancement</li>
          </ul>
        </div>
      )
    },
    {
      title: "Natures Fruit Facial",
      description: "Organic fruit-based facial treatment",
      price: "₹1000",
      src: "/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Natures Fruit Facial uses organic fruit extracts to provide natural nourishment and refreshment for your skin.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Organic fruit extracts</li>
            <li>Natural nourishment</li>
            <li>Skin refreshment</li>
            <li>Chemical-free treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Natures Pearl Facial",
      description: "Natural pearl facial with organic care",
      price: "₹1200",
      src: "/images/skin-care/emiliano-vittoriosi-qTu9DppC3mM-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Natures Pearl Facial combines natural pearl extracts with organic skincare for gentle, effective skin enhancement.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Natural pearl extracts</li>
            <li>Organic skincare</li>
            <li>Gentle skin enhancement</li>
            <li>Natural radiance boost</li>
          </ul>
        </div>
      )
    },
    {
      title: "Shehanaz Gold Facial 24ct",
      description: "Premium 24ct gold facial treatment",
      price: "₹2400",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash1.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Shehanaz Gold Facial 24ct offers the ultimate luxury with pure 24-carat gold treatment for premium skin care results.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>24-carat gold treatment</li>
            <li>Ultimate luxury experience</li>
            <li>Premium skin care</li>
            <li>Anti-aging properties</li>
          </ul>
        </div>
      )
    },
    {
      title: "Lotus Glow",
      description: "Lotus-based facial for natural glow",
      price: "₹1300",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Lotus Glow facial uses lotus extracts to provide natural skin brightening and a healthy, radiant glow.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Lotus extract benefits</li>
            <li>Natural skin brightening</li>
            <li>Healthy radiant glow</li>
            <li>Gentle skin treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Cherrys Facial",
      description: "Cherry-based facial for skin rejuvenation",
      price: "₹1500+",
      src: "/images/skin-care/kimia-kazemi-pKImvnIWBZk-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Cherrys Facial uses cherry extracts to provide antioxidant-rich treatment for skin rejuvenation and vitality.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Cherry extract benefits</li>
            <li>Antioxidant-rich treatment</li>
            <li>Skin rejuvenation</li>
            <li>Natural vitality boost</li>
          </ul>
        </div>
      )
    },
    {
      title: "Bridal Glow Aroma",
      description: "Aromatherapy facial for bridal preparation",
      price: "₹1900",
      src: "/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Bridal Glow Aroma facial combines aromatherapy with specialized treatments to prepare your skin for special occasions.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Aromatherapy benefits</li>
            <li>Bridal preparation treatment</li>
            <li>Special occasion glow</li>
            <li>Relaxing experience</li>
          </ul>
        </div>
      )
    },
    {
      title: "Skin Glow Aroma",
      description: "Aromatherapy facial for natural skin glow",
      price: "₹1650",
      src: "/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Skin Glow Aroma facial uses aromatherapy techniques to enhance your natural skin glow and provide relaxation.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Aromatherapy techniques</li>
            <li>Natural skin glow enhancement</li>
            <li>Relaxation benefits</li>
            <li>Stress relief treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "DeTan Facial Aroma",
      description: "Aromatherapy facial with tan removal",
      price: "₹1550",
      src: "/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our DeTan Facial Aroma combines aromatherapy with effective tan removal treatment for refreshed, even-toned skin.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Aromatherapy relaxation</li>
            <li>Effective tan removal</li>
            <li>Even skin tone</li>
            <li>Refreshed skin feeling</li>
          </ul>
        </div>
      )
    },
    {
      title: "Gold Facial Aroma",
      description: "Aromatherapy gold facial for luxury treatment",
      price: "₹1700",
      src: "/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Gold Facial Aroma combines the luxury of gold treatment with aromatherapy for an indulgent, relaxing experience.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Gold treatment benefits</li>
            <li>Aromatherapy relaxation</li>
            <li>Luxury experience</li>
            <li>Indulgent treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Vitamin C Brightening",
      description: "Vitamin C facial for skin brightening",
      price: "₹2500",
      src: "/images/skin-care/emiliano-vittoriosi-qTu9DppC3mM-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Vitamin C Brightening facial uses high-potency vitamin C to brighten skin, reduce dark spots, and improve skin texture.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>High-potency vitamin C</li>
            <li>Skin brightening</li>
            <li>Dark spot reduction</li>
            <li>Improved skin texture</li>
          </ul>
        </div>
      )
    },
    {
      title: "Sensi Glow",
      description: "Sensitive skin facial treatment",
      price: "₹2000",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash1.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Sensi Glow facial is specially designed for sensitive skin, providing gentle care and natural glow enhancement.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Gentle sensitive skin care</li>
            <li>Natural glow enhancement</li>
            <li>Hypoallergenic products</li>
            <li>Soothing treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "ClariGlow",
      description: "Clarifying facial for clear, radiant skin",
      price: "₹1800",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our ClariGlow facial focuses on clarifying and purifying the skin for a clear, radiant complexion.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Skin clarifying treatment</li>
            <li>Purifying benefits</li>
            <li>Clear complexion</li>
            <li>Radiant skin results</li>
          </ul>
        </div>
      )
    },
    {
      title: "Vitalift",
      description: "Anti-aging facial for youthful skin",
      price: "₹2600",
      src: "/images/skin-care/kimia-kazemi-pKImvnIWBZk-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Vitalift facial provides advanced anti-aging treatment to lift, firm, and rejuvenate your skin for a youthful appearance.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Advanced anti-aging treatment</li>
            <li>Skin lifting and firming</li>
            <li>Youthful appearance</li>
            <li>Skin rejuvenation</li>
          </ul>
        </div>
      )
    },
    {
      title: "Gold Sheen Lotus",
      description: "Gold and lotus combination facial",
      price: "₹1500",
      src: "/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Gold Sheen Lotus facial combines the benefits of gold and lotus extracts for luxurious skin enhancement.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Gold and lotus combination</li>
            <li>Luxurious skin enhancement</li>
            <li>Natural radiance</li>
            <li>Premium treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Glow Dermie Lotus",
      description: "Dermatological lotus facial treatment",
      price: "₹2200",
      src: "/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Glow Dermie Lotus facial uses dermatological-grade lotus extracts for professional skin glow enhancement.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Dermatological-grade treatment</li>
            <li>Professional skin glow</li>
            <li>Lotus extract benefits</li>
            <li>Clinical results</li>
          </ul>
        </div>
      )
    },
    {
      title: "Insta Fair Lotus",
      description: "Instant fairness lotus facial",
      price: "₹2950",
      src: "/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Insta Fair Lotus facial provides instant fairness results using advanced lotus-based formulations.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Instant fairness results</li>
            <li>Advanced lotus formulations</li>
            <li>Immediate skin improvement</li>
            <li>Premium fairness treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Fairness Facial Raga",
      description: "Raga fairness facial treatment",
      price: "₹1300",
      src: "/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Fairness Facial Raga uses traditional Raga formulations for natural skin fairness and brightness.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Traditional Raga formulations</li>
            <li>Natural skin fairness</li>
            <li>Skin brightness enhancement</li>
            <li>Herbal treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Aroma Pearl",
      description: "Aromatherapy pearl facial treatment",
      price: "₹1450",
      src: "/images/skin-care/emiliano-vittoriosi-qTu9DppC3mM-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Aroma Pearl facial combines aromatherapy with pearl extracts for a relaxing and rejuvenating experience.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Aromatherapy relaxation</li>
            <li>Pearl extract benefits</li>
            <li>Rejuvenating experience</li>
            <li>Stress relief treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Raga Strawberry Extract",
      description: "Strawberry extract facial treatment",
      price: "₹1200",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash1.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Raga Strawberry Extract facial uses natural strawberry extracts for skin nourishment and natural glow.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Natural strawberry extracts</li>
            <li>Skin nourishment</li>
            <li>Natural glow enhancement</li>
            <li>Antioxidant benefits</li>
          </ul>
        </div>
      )
    },
    {
      title: "Anti Acne Facial Raga",
      description: "Anti-acne facial treatment",
      price: "₹1750",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Anti Acne Facial Raga uses specialized formulations to treat acne-prone skin and prevent breakouts.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Anti-acne treatment</li>
            <li>Acne prevention</li>
            <li>Specialized formulations</li>
            <li>Clear skin results</li>
          </ul>
        </div>
      )
    },
    {
      title: "Instant Glow Wine Facial",
      description: "Wine-based instant glow facial",
      price: "₹2550",
      src: "/images/skin-care/kimia-kazemi-pKImvnIWBZk-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Instant Glow Wine Facial uses wine extracts to provide instant skin glow and antioxidant benefits.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Wine extract benefits</li>
            <li>Instant skin glow</li>
            <li>Antioxidant properties</li>
            <li>Luxury treatment</li>
          </ul>
        </div>
      )
    }
  ];

  // Threading Cards - Ladies Only
  const ladiesThreadingCards = [
    {
      title: "Eyebrow",
      description: "Professional eyebrow shaping and threading",
      price: "₹40",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Eyebrow threading service provides precise shaping and definition for perfectly arched brows that enhance your natural features.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Precise eyebrow shaping</li>
            <li>Professional threading technique</li>
            <li>Natural arch definition</li>
            <li>Gentle on sensitive skin</li>
          </ul>
        </div>
      )
    },
    {
      title: "Upper Lip",
      description: "Gentle upper lip hair removal",
      price: "₹30",
      src: "/images/skin-care/kimia-kazemi-pKImvnIWBZk-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Upper Lip threading service removes unwanted hair gently and precisely for smooth, clean results.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Gentle hair removal</li>
            <li>Precise threading technique</li>
            <li>Smooth, clean results</li>
            <li>Minimal discomfort</li>
          </ul>
        </div>
      )
    },
    {
      title: "Forehead",
      description: "Forehead hair removal and shaping",
      price: "₹30",
      src: "/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Forehead threading service removes unwanted hair from the forehead area for a clean, polished look.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Forehead hair removal</li>
            <li>Clean, polished appearance</li>
            <li>Professional technique</li>
            <li>Gentle treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Chin",
      description: "Chin area hair removal",
      price: "₹30",
      src: "/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Chin threading service removes unwanted hair from the chin area for smooth, flawless skin.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Chin hair removal</li>
            <li>Smooth, flawless results</li>
            <li>Precise threading</li>
            <li>Gentle technique</li>
          </ul>
        </div>
      )
    },
    {
      title: "Cheek",
      description: "Cheek area hair removal and shaping",
      price: "₹80",
      src: "/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Cheek threading service removes unwanted hair from the cheek area for smooth, defined facial contours.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Cheek hair removal</li>
            <li>Defined facial contours</li>
            <li>Professional shaping</li>
            <li>Smooth results</li>
          </ul>
        </div>
      )
    },
    {
      title: "Side",
      description: "Side facial hair removal",
      price: "₹100",
      src: "/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Side threading service removes unwanted hair from the sides of the face for clean, defined facial lines.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Side facial hair removal</li>
            <li>Clean, defined lines</li>
            <li>Professional technique</li>
            <li>Gentle treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Face",
      description: "Complete facial hair removal",
      price: "₹200",
      src: "/images/skin-care/emiliano-vittoriosi-qTu9DppC3mM-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Full Face threading service provides complete facial hair removal for smooth, flawless skin all over.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Complete facial hair removal</li>
            <li>Smooth, flawless skin</li>
            <li>Comprehensive treatment</li>
            <li>Professional service</li>
          </ul>
        </div>
      )
    }
  ];

  // Bleaching Cards - Unisex (No gender differentiation)
  const bleachingCards = [
    {
      title: "Face",
      description: "Professional facial bleaching for radiant skin",
      price: "₹300",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Face bleaching service provides professional facial hair lightening and skin brightening for a radiant, smooth complexion.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Facial hair lightening</li>
            <li>Skin brightening treatment</li>
            <li>Radiant complexion</li>
            <li>Safe, high-quality products</li>
          </ul>
        </div>
      )
    },
    {
      title: "Neck",
      description: "Neck area bleaching for even skin tone",
      price: "₹300",
      src: "/images/skin-care/kimia-kazemi-pKImvnIWBZk-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Neck bleaching service targets the neck area to lighten hair and even out skin tone for a seamless look.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Neck hair lightening</li>
            <li>Even skin tone</li>
            <li>Seamless appearance</li>
            <li>Gentle treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Upper Lip",
      description: "Upper lip hair bleaching",
      price: "₹50",
      src: "/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Upper Lip bleaching service gently lightens upper lip hair for a clean, natural appearance.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Upper lip hair lightening</li>
            <li>Clean appearance</li>
            <li>Natural look</li>
            <li>Gentle technique</li>
          </ul>
        </div>
      )
    },
    {
      title: "Underarm",
      description: "Underarm bleaching for smooth skin",
      price: "₹200",
      src: "/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Underarm bleaching service lightens underarm hair and brightens skin for smooth, clean results.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Underarm hair lightening</li>
            <li>Skin brightening</li>
            <li>Smooth, clean results</li>
            <li>Professional care</li>
          </ul>
        </div>
      )
    },
    {
      title: "Low Neck/Upper Neck",
      description: "Low neck and upper neck bleaching",
      price: "₹250",
      src: "/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Low Neck/Upper Neck bleaching service targets specific neck areas for precise hair lightening and skin brightening.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Precise neck area treatment</li>
            <li>Hair lightening</li>
            <li>Skin brightening</li>
            <li>Targeted approach</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Neck",
      description: "Complete neck bleaching treatment",
      price: "₹400",
      src: "/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Full Neck bleaching service provides comprehensive neck area treatment for complete hair lightening and skin brightening.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Complete neck treatment</li>
            <li>Comprehensive hair lightening</li>
            <li>Full skin brightening</li>
            <li>Professional service</li>
          </ul>
        </div>
      )
    },
    {
      title: "Feet",
      description: "Feet bleaching for smooth, bright skin",
      price: "₹300",
      src: "/images/skin-care/emiliano-vittoriosi-qTu9DppC3mM-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Feet bleaching service lightens foot hair and brightens skin for smooth, clean feet.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Foot hair lightening</li>
            <li>Skin brightening</li>
            <li>Smooth, clean feet</li>
            <li>Gentle treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Half Arm",
      description: "Half arm bleaching treatment",
      price: "₹300",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash1.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Half Arm bleaching service targets the lower half of the arm for hair lightening and skin brightening.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Lower arm treatment</li>
            <li>Hair lightening</li>
            <li>Skin brightening</li>
            <li>Precise application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Arm",
      description: "Complete arm bleaching treatment",
      price: "₹500",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Full Arm bleaching service provides comprehensive arm treatment for complete hair lightening and skin brightening.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Complete arm treatment</li>
            <li>Full hair lightening</li>
            <li>Comprehensive skin brightening</li>
            <li>Professional service</li>
          </ul>
        </div>
      )
    },
    {
      title: "Half Leg",
      description: "Half leg bleaching treatment",
      price: "₹450",
      src: "/images/skin-care/kimia-kazemi-pKImvnIWBZk-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Half Leg bleaching service targets the lower half of the leg for hair lightening and skin brightening.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Lower leg treatment</li>
            <li>Hair lightening</li>
            <li>Skin brightening</li>
            <li>Gentle technique</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Leg",
      description: "Complete leg bleaching treatment",
      price: "₹750",
      src: "/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Full Leg bleaching service provides comprehensive leg treatment for complete hair lightening and skin brightening.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Complete leg treatment</li>
            <li>Full hair lightening</li>
            <li>Comprehensive skin brightening</li>
            <li>Professional service</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Body",
      description: "Complete body bleaching treatment",
      price: "₹3000",
      src: "/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Full Body bleaching service provides comprehensive body treatment for complete hair lightening and skin brightening all over.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Complete body treatment</li>
            <li>Full body hair lightening</li>
            <li>Comprehensive skin brightening</li>
            <li>Premium service</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Body Premium",
      description: "Premium full body bleaching treatment",
      price: "₹6000",
      src: "/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Full Body Premium bleaching service offers the ultimate luxury treatment with premium products for complete body hair lightening and skin brightening.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Premium full body treatment</li>
            <li>Luxury hair lightening</li>
            <li>Premium skin brightening</li>
            <li>Ultimate luxury service</li>
          </ul>
        </div>
      )
    }
  ];

  // Waxing Cards - Unisex (No gender differentiation)
  const waxingCards = [
    {
      title: "Half Arms",
      description: "Half arm waxing for smooth skin",
      price: "₹250",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Half Arms waxing service removes hair from the lower half of your arms for smooth, silky skin.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Lower arm hair removal</li>
            <li>Smooth, silky results</li>
            <li>Professional waxing technique</li>
            <li>Long-lasting results</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Arms",
      description: "Complete arm waxing treatment",
      price: "₹350",
      src: "/images/skin-care/kimia-kazemi-pKImvnIWBZk-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Full Arms waxing service provides complete arm hair removal for smooth, flawless skin from shoulder to wrist.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Complete arm hair removal</li>
            <li>Smooth, flawless skin</li>
            <li>Professional technique</li>
            <li>Comprehensive treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Half Leg",
      description: "Half leg waxing treatment",
      price: "₹350",
      src: "/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Half Leg waxing service removes hair from the lower half of your legs for smooth, hair-free skin.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Lower leg hair removal</li>
            <li>Smooth, hair-free skin</li>
            <li>Gentle waxing technique</li>
            <li>Long-lasting results</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Leg",
      description: "Complete leg waxing treatment",
      price: "₹450",
      src: "/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Full Leg waxing service provides complete leg hair removal for smooth, flawless skin from thigh to ankle.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Complete leg hair removal</li>
            <li>Smooth, flawless skin</li>
            <li>Professional technique</li>
            <li>Comprehensive treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Under Arms",
      description: "Underarm waxing for smooth skin",
      price: "₹100",
      src: "/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Under Arms waxing service removes underarm hair for smooth, clean skin with long-lasting results.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Underarm hair removal</li>
            <li>Smooth, clean skin</li>
            <li>Gentle technique</li>
            <li>Long-lasting results</li>
          </ul>
        </div>
      )
    },
    {
      title: "Lower/Upper Back",
      description: "Back area waxing treatment",
      price: "₹400",
      src: "/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Lower/Upper Back waxing service removes unwanted hair from the back area for smooth, flawless skin.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Back area hair removal</li>
            <li>Smooth, flawless skin</li>
            <li>Professional technique</li>
            <li>Comfortable experience</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Face",
      description: "Complete facial waxing treatment",
      price: "₹350",
      src: "/images/skin-care/emiliano-vittoriosi-qTu9DppC3mM-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Full Face waxing service removes unwanted facial hair for smooth, clean skin and a refreshed appearance.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Complete facial hair removal</li>
            <li>Smooth, clean skin</li>
            <li>Refreshed appearance</li>
            <li>Gentle facial technique</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Back",
      description: "Complete back waxing treatment",
      price: "₹550",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash1.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Full Back waxing service provides comprehensive back hair removal for smooth, flawless skin across the entire back area.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Complete back hair removal</li>
            <li>Smooth, flawless skin</li>
            <li>Professional technique</li>
            <li>Comprehensive treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Upper Lips",
      description: "Upper lip waxing treatment",
      price: "₹50",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Upper Lips waxing service gently removes upper lip hair for a clean, natural appearance.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Upper lip hair removal</li>
            <li>Clean, natural appearance</li>
            <li>Gentle technique</li>
            <li>Precise application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Forehead",
      description: "Forehead waxing treatment",
      price: "₹50",
      src: "/images/skin-care/kimia-kazemi-pKImvnIWBZk-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Forehead waxing service removes unwanted forehead hair for a clean, polished look.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Forehead hair removal</li>
            <li>Clean, polished look</li>
            <li>Gentle technique</li>
            <li>Professional care</li>
          </ul>
        </div>
      )
    },
    {
      title: "Chin",
      description: "Chin area waxing treatment",
      price: "₹50",
      src: "/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Chin waxing service removes unwanted chin hair for smooth, flawless skin.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Chin hair removal</li>
            <li>Smooth, flawless skin</li>
            <li>Gentle technique</li>
            <li>Precise application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Midriff",
      description: "Midriff area waxing treatment",
      price: "₹400",
      src: "/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Midriff waxing service removes unwanted hair from the midriff area for smooth, clean skin.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Midriff hair removal</li>
            <li>Smooth, clean skin</li>
            <li>Professional technique</li>
            <li>Gentle treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Body",
      description: "Complete body waxing treatment",
      price: "₹2500",
      src: "/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Full Body waxing service provides comprehensive body hair removal for smooth, flawless skin all over.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Complete body hair removal</li>
            <li>Smooth, flawless skin</li>
            <li>Comprehensive treatment</li>
            <li>Professional service</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Body Polishing",
      description: "Premium full body waxing with polishing",
      price: "₹5000+",
      src: "/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Full Body Polishing service offers the ultimate luxury waxing experience with premium polishing treatments for silky, refreshed skin.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Premium full body waxing</li>
            <li>Luxury polishing treatment</li>
            <li>Silky, refreshed skin</li>
            <li>Ultimate luxury experience</li>
          </ul>
        </div>
      )
    }
  ];

  // Pedicure & Manicure Cards - Unisex (No gender differentiation)
  const pedicureManicureCards = [
    {
      title: "Normal Pedicure",
      description: "Classic pedicure for healthy, beautiful feet",
      price: "₹700",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Normal Pedicure service provides essential foot care including nail trimming, shaping, cuticle care, and polish application for healthy, beautiful feet.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Nail trimming and shaping</li>
            <li>Cuticle care</li>
            <li>Foot exfoliation</li>
            <li>Polish application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Pedicure Spa",
      description: "Luxury spa pedicure with relaxing massage",
      price: "₹1100",
      src: "/images/skin-care/kimia-kazemi-pKImvnIWBZk-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Pedicure Spa service offers a luxurious foot treatment with relaxing massage, premium exfoliation, and spa-quality nail care for ultimate pampering.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Luxury foot treatment</li>
            <li>Relaxing massage</li>
            <li>Premium exfoliation</li>
            <li>Spa-quality nail care</li>
          </ul>
        </div>
      )
    },
    {
      title: "Crystal Pedicure Spa",
      description: "Premium crystal pedicure with luxury treatment",
      price: "₹1300",
      src: "/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Crystal Pedicure Spa service features premium crystal treatments, luxury foot care, and spa relaxation for the ultimate pampering experience.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Premium crystal treatments</li>
            <li>Luxury foot care</li>
            <li>Spa relaxation</li>
            <li>Ultimate pampering</li>
          </ul>
        </div>
      )
    },
    {
      title: "Ice Cream Pedicure",
      description: "Refreshing ice cream themed pedicure",
      price: "₹1300",
      src: "/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Ice Cream Pedicure service offers a refreshing, fun-themed treatment with cooling effects and delightful aromas for a unique spa experience.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Refreshing treatment</li>
            <li>Cooling effects</li>
            <li>Delightful aromas</li>
            <li>Unique spa experience</li>
          </ul>
        </div>
      )
    },
    {
      title: "Chocolate Pedicure",
      description: "Indulgent chocolate themed pedicure",
      price: "₹1300",
      src: "/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Chocolate Pedicure service provides an indulgent treatment with rich chocolate aromas and luxurious ingredients for a decadent spa experience.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Indulgent treatment</li>
            <li>Rich chocolate aromas</li>
            <li>Luxurious ingredients</li>
            <li>Decadent spa experience</li>
          </ul>
        </div>
      )
    },
    {
      title: "Normal Manicure",
      description: "Classic manicure for beautiful hands",
      price: "₹600",
      src: "/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Normal Manicure service provides essential hand care including nail trimming, shaping, cuticle care, and polish application for beautiful, well-groomed hands.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Nail trimming and shaping</li>
            <li>Cuticle care</li>
            <li>Hand exfoliation</li>
            <li>Polish application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Manicure Spa",
      description: "Luxury spa manicure with relaxing massage",
      price: "₹700",
      src: "/images/skin-care/emiliano-vittoriosi-qTu9DppC3mM-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Manicure Spa service offers a luxurious hand treatment with relaxing massage, premium exfoliation, and spa-quality nail care for ultimate hand pampering.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Luxury hand treatment</li>
            <li>Relaxing massage</li>
            <li>Premium exfoliation</li>
            <li>Spa-quality nail care</li>
          </ul>
        </div>
      )
    },
    {
      title: "Crystal Manicure",
      description: "Premium crystal manicure treatment",
      price: "₹800",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash1.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Crystal Manicure service features premium crystal treatments, luxury hand care, and spa relaxation for the ultimate hand pampering experience.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Premium crystal treatments</li>
            <li>Luxury hand care</li>
            <li>Spa relaxation</li>
            <li>Ultimate hand pampering</li>
          </ul>
        </div>
      )
    },
    {
      title: "Ice Cream Manicure",
      description: "Refreshing ice cream themed manicure",
      price: "₹650",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Ice Cream Manicure service offers a refreshing, fun-themed hand treatment with cooling effects and delightful aromas for a unique spa experience.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Refreshing hand treatment</li>
            <li>Cooling effects</li>
            <li>Delightful aromas</li>
            <li>Unique spa experience</li>
          </ul>
        </div>
      )
    }
  ];

  // Massage Services Cards - Unisex (No gender differentiation)
  const massageServicesCards = [
    {
      title: "Pure Coconut Nourishing Head Massage",
      description: "Nourishing coconut oil head massage for healthy hair and scalp",
      price: "₹500",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Pure Coconut Nourishing Head Massage uses premium coconut oil to deeply nourish your scalp and hair, promoting healthy growth and relaxation.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Premium coconut oil treatment</li>
            <li>Deep scalp nourishment</li>
            <li>Healthy hair growth promotion</li>
            <li>Relaxing head massage</li>
          </ul>
        </div>
      )
    },
    {
      title: "Olive Oil Head Massage",
      description: "Therapeutic olive oil head massage",
      price: "₹600",
      src: "/images/skin-care/kimia-kazemi-pKImvnIWBZk-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Olive Oil Head Massage provides therapeutic benefits with premium olive oil, improving scalp health and promoting hair strength and shine.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Therapeutic olive oil treatment</li>
            <li>Scalp health improvement</li>
            <li>Hair strength and shine</li>
            <li>Professional massage technique</li>
          </ul>
        </div>
      )
    },
    {
      title: "Hot Oil Massage",
      description: "Relaxing hot oil head massage",
      price: "₹550",
      src: "/images/skin-care/kimia-kazemi-u93nTfWqR9w-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Hot Oil Massage uses warm oil to deeply penetrate the scalp, providing ultimate relaxation and nourishment for healthy hair and stress relief.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Warm oil penetration</li>
            <li>Deep scalp nourishment</li>
            <li>Ultimate relaxation</li>
            <li>Stress relief benefits</li>
          </ul>
        </div>
      )
    },
    {
      title: "Normal Head Massage",
      description: "Classic head massage for relaxation",
      price: "₹250",
      src: "/images/skin-care/kimia-kazemi-weD0qHDlhf8-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Normal Head Massage provides essential relaxation and stress relief through professional massage techniques that soothe your mind and body.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Essential relaxation</li>
            <li>Stress relief</li>
            <li>Professional massage techniques</li>
            <li>Mind and body soothing</li>
          </ul>
        </div>
      )
    },
    {
      title: "Advanced Head Massage",
      description: "Premium advanced head massage treatment",
      price: "₹500",
      src: "/images/skin-care/rosa-rafael-Pe9IXUuC6QU-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Advanced Head Massage offers premium treatment with specialized techniques for deep relaxation, improved circulation, and enhanced wellness.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Premium treatment</li>
            <li>Specialized techniques</li>
            <li>Deep relaxation</li>
            <li>Improved circulation</li>
          </ul>
        </div>
      )
    },
    {
      title: "Hand Massage (20 min)",
      description: "Therapeutic hand massage for relaxation",
      price: "₹200",
      src: "/images/skin-care/rune-enstad-cowLgyb63c4-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Hand Massage provides therapeutic relief for tired hands, improving circulation and reducing tension through professional massage techniques.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Therapeutic hand relief</li>
            <li>Improved circulation</li>
            <li>Tension reduction</li>
            <li>Professional techniques</li>
          </ul>
        </div>
      )
    },
    {
      title: "Foot Massage (20 min)",
      description: "Relaxing foot massage for tired feet",
      price: "₹300",
      src: "/images/skin-care/emiliano-vittoriosi-qTu9DppC3mM-unsplash.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Foot Massage provides deep relaxation for tired feet, relieving stress and improving circulation through professional reflexology techniques.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Deep foot relaxation</li>
            <li>Stress relief</li>
            <li>Improved circulation</li>
            <li>Reflexology techniques</li>
          </ul>
        </div>
      )
    },
    {
      title: "Back Massage (20 min)",
      description: "Therapeutic back massage for muscle relief",
      price: "₹500",
      src: "/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash1.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Back Massage targets muscle tension and stress, providing therapeutic relief through professional massage techniques that promote overall wellness.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Muscle tension relief</li>
            <li>Therapeutic back treatment</li>
            <li>Stress reduction</li>
            <li>Overall wellness promotion</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <>
      <div className="sr-only">
        <h1>BA-BU Family Salon - Skin & Body Care Services</h1>
        <p>Professional skincare, body treatments, and wellness services for all skin types and concerns.</p>
      </div>

      {/* Main Hero Section */}
      <OptimizedHero
        title="Skin & Body Care"
        subtitle="Rejuvenating Treatments & Wellness"
        backgroundImage="/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp"
      />

      {/* Cleanup & Detan Section */}
      <section className="cleanup-detran-section">
        <OptimizedSectionHero
          title="Cleanup & Detan"
          description="Professional facial cleanup and tan removal treatments for glowing, healthy skin."
        />

        {/* Cleanup & Detan Section */}
        <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              
              {/* Enhanced Writeup Section */}
              <div className="w-full mb-12">
                <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-gray-800">
                  <div className="w-full">
                    <div className="text-center">
                      <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        Refresh and rejuvenate your skin with <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">BA-BU Salon's Cleanup & Detan treatments</span>. Our expert skincare specialists use premium products to deeply cleanse, remove tan, and restore your natural glow. Whether it's for clearing impurities, brightening dull skin, or achieving an even tone, our customized cleanup and detan services are designed to leave your skin fresh, smooth, and radiant.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ladies Cleanup & Detan Pricing - Expandable Cards */}
              <div className="mb-6">
                <h5 className="text-lg font-gunteerz font-semibold text-white text-left">
                  For Ladies
                </h5>
              </div>
              <ExpandableSkinCareCards cards={ladiesCleanupCards} gender="female" onBookNow={handleBookNow} />

              {/* Gents Cleanup & Detan Pricing - Expandable Cards */}
              <div className="mb-6 mt-12">
                <h5 className="text-lg font-gunteerz font-semibold text-white text-left">
                  For Gents
                </h5>
              </div>
              <ExpandableSkinCareCards cards={gentsCleanupCards} gender="male" onBookNow={handleBookNow} />
            </div>
          </div>
        </div>

        {/* Skin Care Gallery - Infinite Scroll */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-gunteerz font-bold text-white mb-4">
                Our Skin Care Treatments
              </h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
                Browse through our collection of effective skin care treatments
              </p>
            </div>

            {/* Infinite Scroll Gallery */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right">
                {/* First set of images */}
                {skinCareImages.map((image, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 w-64 sm:w-80 mx-2 sm:mx-4"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {image.title && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {image.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {skinCareImages.map((image, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-64 sm:w-80 mx-2 sm:mx-4"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {image.title && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {image.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Facials Section */}
      <section className="facials-section">
        <OptimizedSectionHero
          title="Facials"
          description="Rejuvenating facial treatments for all skin types and concerns."
        />

        {/* Facials Section */}
        <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              
              {/* Enhanced Writeup Section */}
              <div className="w-full mb-12">
                <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-gray-800">
                  <div className="w-full">
                    <div className="text-center">
                      <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        Pamper your skin with rejuvenating facial treatments at <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">BA-BU Salon</span>. Our range of facials, including <span className="font-semibold text-[#ffd277]">brightening</span>, <span className="font-semibold text-[#ffd277]">anti-aging</span>, <span className="font-semibold text-[#ffd277]">hydrating</span>, and <span className="font-semibold text-[#ffd277]">gold facials</span>, are designed to cleanse, nourish, and refresh your skin for a radiant, healthy glow. Each session is customized to suit your skin type, using premium skincare products and gentle techniques that deliver visible results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facials Pricing - Expandable Cards (No gender differentiation) */}
              <div className="mb-6">
                <h5 className="text-lg font-gunteerz font-semibold text-white text-left">
                  Facial Treatments
                </h5>
              </div>
              <ExpandableSkinCareCards cards={facialsCards} gender="unisex" onBookNow={handleBookNow} />
            </div>
          </div>
        </div>

        {/* Facials Gallery - Infinite Scroll */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-gunteerz font-bold text-white mb-4">
                Our Facial Treatments
              </h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
                Explore our comprehensive range of facial treatments for all skin types
              </p>
            </div>

            {/* Infinite Scroll Gallery */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right">
                {/* First set of images */}
                {skinCareImages.map((image, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 w-64 sm:w-80 mx-2 sm:mx-4"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {image.title && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {image.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {skinCareImages.map((image, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-64 sm:w-80 mx-2 sm:mx-4"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {image.title && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {image.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Threading Section */}
      <section className="threading-section">
        <OptimizedSectionHero
          title="Threading"
          description="Professional eyebrow shaping and facial hair removal for perfect definition."
        />

        {/* Threading Section */}
        <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              
              {/* Enhanced Writeup Section */}
              <div className="w-full mb-12">
                <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-gray-800">
                  <div className="w-full">
                    <div className="text-center">
                      <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        Achieve perfectly shaped brows and smooth, flawless skin with professional threading services at <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">BA-BU Salon</span>. Our experts specialize in precise <span className="font-semibold text-[#ffd277]">eyebrow shaping</span>, <span className="font-semibold text-[#ffd277]">upper lip</span>, <span className="font-semibold text-[#ffd277]">chin</span>, and <span className="font-semibold text-[#ffd277]">full-face threading</span> using gentle techniques that minimize discomfort and irritation. Experience clean, defined results that enhance your natural features — because beauty begins with perfect brows.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ladies Threading Pricing - Expandable Cards */}
              <div className="mb-6">
                <h5 className="text-lg font-gunteerz font-semibold text-white text-left">
                  For Ladies
                </h5>
              </div>
              <ExpandableSkinCareCards cards={ladiesThreadingCards} gender="female" onBookNow={handleBookNow} />
            </div>
          </div>
        </div>

        {/* Threading Gallery - Infinite Scroll */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-gunteerz font-bold text-white mb-4">
                Our Threading Services
              </h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
                Professional threading techniques for perfect facial definition
              </p>
            </div>

            {/* Infinite Scroll Gallery */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right">
                {/* First set of images */}
                {skinCareImages.map((image, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 w-64 sm:w-80 mx-2 sm:mx-4"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {image.title && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {image.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {skinCareImages.map((image, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-64 sm:w-80 mx-2 sm:mx-4"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {image.title && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {image.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Bleaching Section */}
      <section className="bleaching-section">
        <OptimizedSectionHero
          title="Bleaching"
          description="Professional skin lightening and hair bleaching for radiant, smooth skin."
        />

        {/* Bleaching Section */}
        <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              
              {/* Enhanced Writeup Section */}
              <div className="w-full mb-12">
                <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-gray-800">
                  <div className="w-full">
                    <div className="text-center">
                      <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        Brighten your look with professional <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">bleaching services</span> at <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">BA-BU Salon</span>. Our experts use safe, high-quality products to lighten facial hair and even skin tone, giving your complexion a radiant, smooth glow. Whether it's a <span className="font-semibold text-[#ffd277]">full-face bleach</span>, <span className="font-semibold text-[#ffd277]">neck bleach</span>, or <span className="font-semibold text-[#ffd277]">detan and bleach combo</span>, we ensure gentle care suited for all skin types. Reveal a fresher, brighter you with our specialized skin-lightening treatments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bleaching Pricing - Expandable Cards (Unisex - No gender differentiation) */}
              <div className="mb-6">
                <h5 className="text-lg font-gunteerz font-semibold text-white text-left">
                  Bleaching Services
                </h5>
              </div>
              <ExpandableSkinCareCards cards={bleachingCards} gender="unisex" onBookNow={handleBookNow} />
            </div>
          </div>
        </div>

        {/* Bleaching Gallery - Infinite Scroll */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-gunteerz font-bold text-white mb-4">
                Our Bleaching Services
              </h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
                Professional skin lightening and hair bleaching treatments
              </p>
            </div>

            {/* Infinite Scroll Gallery */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right">
                {/* First set of images */}
                {skinCareImages.map((image, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 w-64 sm:w-80 mx-2 sm:mx-4"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {image.title && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {image.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {skinCareImages.map((image, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-64 sm:w-80 mx-2 sm:mx-4"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {image.title && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {image.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Waxing Section */}
      <section className="waxing-section">
        <OptimizedSectionHero
          title="Waxing"
          description="Professional hair removal services for smooth, flawless skin."
        />

        {/* Waxing Section */}
        <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              
              {/* Enhanced Writeup Section */}
              <div className="w-full mb-12">
                <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-gray-800">
                  <div className="w-full">
                    <div className="text-center">
                      <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        Get smooth, flawless skin with <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">BA-BU Salon's professional waxing services</span>. We offer full-body, half-body, face, arms, legs, and bikini waxing using top-quality wax and hygienic techniques. Our expert aestheticians ensure a comfortable, gentle experience with long-lasting results. Stay confident and hair-free with safe, skin-friendly waxing that leaves your skin silky and refreshed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Waxing Pricing - Expandable Cards (Unisex - No gender differentiation) */}
              <div className="mb-6">
                <h5 className="text-lg font-gunteerz font-semibold text-white text-left">
                  Waxing Services
                </h5>
              </div>
              <ExpandableSkinCareCards cards={waxingCards} gender="unisex" onBookNow={handleBookNow} />
            </div>
          </div>
        </div>

        {/* Waxing Gallery - Infinite Scroll */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-gunteerz font-bold text-white mb-4">
                Our Waxing Services
              </h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
                Professional hair removal for smooth, silky skin
              </p>
            </div>

            {/* Infinite Scroll Gallery */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right">
                {/* First set of images */}
                {skinCareImages.map((image, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 w-64 sm:w-80 mx-2 sm:mx-4"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {image.title && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {image.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {skinCareImages.map((image, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-64 sm:w-80 mx-2 sm:mx-4"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {image.title && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {image.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Pedicure & Manicure Section */}
      <section className="pedicure-manicure-section">
        <OptimizedSectionHero
          title="Pedicure & Manicure"
          description="Professional nail care services for beautiful hands and feet."
        />

        {/* Pedicure & Manicure Section */}
        <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              
              {/* Enhanced Writeup Section */}
              <div className="w-full mb-12">
                <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-gray-800">
                  <div className="w-full">
                    <div className="text-center">
                      <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        Pamper your hands and feet with professional <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">pedicure and manicure services</span> at <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">BA-BU Salon</span>. Our treatments include nail trimming, shaping, cuticle care, exfoliation, relaxing massages, and polish application. Choose from classic, gel, or spa options designed to keep your nails healthy, beautiful, and perfectly polished for any occasion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pedicure & Manicure Pricing - Expandable Cards (Unisex - No gender differentiation) */}
              <div className="mb-6">
                <h5 className="text-lg font-gunteerz font-semibold text-white text-left">
                  Pedicure & Manicure Services
                </h5>
              </div>
              <ExpandableSkinCareCards cards={pedicureManicureCards} gender="unisex" onBookNow={handleBookNow} />
            </div>
          </div>
        </div>

        {/* Pedicure & Manicure Gallery - Infinite Scroll */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-gunteerz font-bold text-white mb-4">
                Our Pedicure & Manicure Services
              </h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
                Professional nail care for beautiful hands and feet
              </p>
            </div>

            {/* Infinite Scroll Gallery */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right">
                {/* First set of images */}
                {skinCareImages.map((image, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 w-64 sm:w-80 mx-2 sm:mx-4"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {image.title && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {image.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {skinCareImages.map((image, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-64 sm:w-80 mx-2 sm:mx-4"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {image.title && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {image.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Massage Services Section */}
      <section className="massage-services-section">
        <OptimizedSectionHero
          title="Massage Services"
          description="Relax and rejuvenate with expert massage therapy for overall wellness."
        />

        {/* Massage Services Section */}
        <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              
              {/* Enhanced Writeup Section */}
              <div className="w-full mb-12">
                <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-gray-800">
                  <div className="w-full">
                    <div className="text-center">
                      <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        Relax and rejuvenate with expert massage services at <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">BA-BU Salon</span>. Our skilled therapists offer a variety of massage techniques designed to relieve stress, improve circulation, and promote overall wellness. Whether you want a soothing full-body massage or targeted therapy, enjoy a calming experience that refreshes your body and mind.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Massage Services Pricing - Expandable Cards (Unisex - No gender differentiation) */}
              <div className="mb-6">
                <h5 className="text-lg font-gunteerz font-semibold text-white text-left">
                  Massage Services
                </h5>
              </div>
              <ExpandableSkinCareCards cards={massageServicesCards} gender="unisex" onBookNow={handleBookNow} />
            </div>
          </div>
        </div>

        {/* Massage Services Gallery - Infinite Scroll */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-gunteerz font-bold text-white mb-4">
                Our Massage Services
              </h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
                Professional massage therapy for relaxation and wellness
              </p>
            </div>

            {/* Infinite Scroll Gallery */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right">
                {/* First set of images */}
                {skinCareImages.map((image, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 w-64 sm:w-80 mx-2 sm:mx-4"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {image.title && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {image.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {skinCareImages.map((image, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-64 sm:w-80 mx-2 sm:mx-4"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {image.title && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {image.title}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* CTA Section - Responsive Design */}
      <section className="cta-section py-12 sm:py-16 lg:py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-gunteerz font-bold mb-4 sm:mb-6 leading-tight">
            Ready to Transform Your Skin?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4 sm:px-0">
            Book your skin care appointment today and experience the BA-BU difference
          </p>

          {/* Responsive Button Layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 text-base sm:text-lg text-center"
              aria-label="Contact us on WhatsApp for skin care services"
            >
              WhatsApp Us
            </a>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="w-full sm:w-auto bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] hover:from-[#8a5f0b] hover:via-[#ffd277] hover:to-[#8a5f0b] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 text-base sm:text-lg text-center"
              aria-label="Call us for skin care services"
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
            backgroundImage: "/images/weddings/gallery/wedding-08.webp",
          },
          {
            id: "hair-care",
            title: "Hair Care Services",
            backgroundImage: "/images/hair-care/styling/style-04.avif",
          },
        ]}
      />

      {/* Booking Popup */}
      <BookingPopup 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        serviceDetails={selectedService} 
      />
    </>
  );
};

export default SkinBodyCareServicePage;
