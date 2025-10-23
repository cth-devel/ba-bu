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
const ExpandableHairCutCards = ({ cards, gender = 'female', onBookNow }: { cards: any[], gender?: 'male' | 'female', onBookNow: (title: string, price: string, gender: string) => void }) => {
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
              ) : (
                <div className="absolute top-4 right-16 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <img 
                    src="/men.svg" 
                    alt="Male symbol" 
                    className="w-5 h-5 filter brightness-0 invert"
                  />
                </div>
              )}
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
                ) : (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <img 
                      src="/men.svg" 
                      alt="Male symbol" 
                      className="w-4 h-4 filter brightness-0 invert"
                    />
                  </div>
                )}
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

const HairCareServicePage = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{ title: string, price: string, gender: string } | null>(null);

  const handleBookNow = (title: string, price: string, gender: string) => {
    setSelectedService({ title, price, gender });
    setIsBookingOpen(true);
  };
  const hairCutImages = [
    {
      src: '/images/hair-care/styling/style-01.webp',
      alt: 'Professional haircut and styling',
      title: 'Basic Haircut'
    },
    {
      src: '/images/hair-care/styling/style-04.avif',
      alt: 'Modern hair styling techniques',
      title: 'Stylish Cut'
    },
    {
      src: '/images/hair-care/styling/style-07.webp',
      alt: 'Premium hair cutting service',
      title: 'Premium Cut'
    },
    {
      src: '/images/hair-care/styling/style-10.webp',
      alt: 'Luxury hair styling treatment',
      title: 'Luxury Styling'
    }
  ];

  // Hair Cut Cards for Expandable Component
  const hairCutCards = [
    {
      title: "Kids Cut (Below 10 years)",
      description: "Specialized haircut for little girls under 10",
      price: "₹150",
      src: "/images/hair-care/styling/style-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Kids Cut service is specially designed for little girls under 10 years old, ensuring a comfortable and safe experience for your daughters.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Child-friendly environment</li>
            <li>Gentle cutting techniques</li>
            <li>Quick and efficient service</li>
            <li>Fun and engaging experience</li>
          </ul>
        </div>
      )
    },
    {
      title: "Kids Advanced",
      description: "Advanced styling for young ladies",
      price: "₹450",
      src: "/images/hair-care/styling/style-04.avif",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Advanced styling service for young ladies who want something more than a basic cut, including styling and finishing touches.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Advanced cutting techniques</li>
            <li>Styling and finishing</li>
            <li>Child-friendly products</li>
            <li>Professional consultation</li>
          </ul>
        </div>
      )
    },
    {
      title: "Basic Hair Cut",
      description: "Simple trim and style for women",
      price: "₹350",
      src: "/images/hair-care/styling/style-07.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            A simple and clean haircut perfect for women maintaining their current style or getting a fresh trim.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Professional cutting</li>
            <li>Basic styling</li>
            <li>Quality consultation</li>
            <li>Quick service</li>
          </ul>
        </div>
      )
    },
    {
      title: "Advanced Haircut",
      description: "Complete service for ladies - Shampoo + Conditioning + Blow Dry",
      price: "₹800",
      src: "/images/hair-care/styling/style-10.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Complete hair service for women including professional shampoo, conditioning treatment, precision cutting, and professional blow dry styling.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Professional shampoo & conditioning</li>
            <li>Precision cutting techniques</li>
            <li>Professional blow dry styling</li>
            <li>Hair consultation included</li>
            <li>Premium finishing products</li>
          </ul>
        </div>
      )
    },
    {
      title: "Creative Haircut",
      description: "Premium styling for women - Shampoo + Conditioning + Blowdry",
      price: "₹950",
      src: "/images/hair-care/styling/style-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our premium creative haircut service for women includes everything in the Advanced package plus creative styling and artistic finishing touches.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Luxury shampoo & conditioning</li>
            <li>Creative cutting techniques</li>
            <li>Artistic styling & blow dry</li>
            <li>Personalized consultation</li>
            <li>Premium styling products</li>
            <li>Finishing touches & styling tips</li>
          </ul>
        </div>
      )
    },
    {
      title: "Shampoo + Conditioning (S/M/L)",
      description: "Professional shampoo and conditioning service in three sizes",
      price: "₹300/350/450",
      src: "/images/hair-care/styling/style-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Professional shampoo and conditioning service available in Small, Medium, and Large sizes. Perfect for maintaining healthy, clean hair.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Professional shampoo treatment</li>
            <li>Deep conditioning</li>
            <li>Hair health consultation</li>
            <li>Premium hair products</li>
          </ul>
        </div>
      )
    },
    {
      title: "Shampoo + Conditioning + Styling (S/M/L)",
      description: "Complete service with shampoo, conditioning, and styling",
      price: "₹500/600/700",
      src: "/images/hair-care/styling/style-04.avif",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Complete hair service including professional shampoo, conditioning, and styling. Available in Small, Medium, and Large sizes for different hair lengths.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Professional shampoo & conditioning</li>
            <li>Expert styling techniques</li>
            <li>Hair consultation included</li>
            <li>Premium finishing products</li>
          </ul>
        </div>
      )
    },
    {
      title: "Ironing (S/M/L)",
      description: "Professional hair ironing service for straight, sleek look",
      price: "₹500/500/1200",
      src: "/images/hair-care/styling/style-07.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Professional hair ironing service for a straight, sleek look. Available in Small, Medium, and Large sizes with heat protection treatments.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Professional ironing technique</li>
            <li>Heat protection treatment</li>
            <li>Straight, sleek finish</li>
            <li>Hair health consultation</li>
          </ul>
        </div>
      )
    },
    {
      title: "Roller Setting (S/M/L)",
      description: "Classic roller setting for beautiful curls and waves",
      price: "₹500/800/1200",
      src: "/images/hair-care/styling/style-10.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Classic roller setting service for beautiful curls and waves. Available in Small, Medium, and Large sizes for different hair lengths and desired styles.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Classic roller setting technique</li>
            <li>Beautiful curls and waves</li>
            <li>Professional styling products</li>
            <li>Long-lasting results</li>
          </ul>
        </div>
      )
    }
  ];

  // Gents Hair Cut Cards for Expandable Component
  const gentsHairCutCards = [
    {
      title: "Normal Hair Cut",
      description: "Classic haircut for men",
      price: "₹150",
      src: "/images/hair-care/styling/style-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Normal Hair Cut service provides men with a clean, classic haircut that maintains their current style while ensuring a fresh, professional look.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Professional cutting techniques</li>
            <li>Clean and precise styling</li>
            <li>Quick and efficient service</li>
            <li>Quality consultation included</li>
          </ul>
        </div>
      )
    },
    {
      title: "Change of Hair Style",
      description: "Complete style transformation for men",
      price: "₹200",
      src: "/images/hair-care/styling/style-04.avif",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Transform your look with our Change of Hair Style service. Our expert barbers will help you discover a new style that complements your face shape and lifestyle.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Style consultation and advice</li>
            <li>Modern cutting techniques</li>
            <li>Styling and finishing</li>
            <li>Personalized recommendations</li>
          </ul>
        </div>
      )
    },
    {
      title: "Beard Setting/Shaving",
      description: "Professional beard grooming for men",
      price: "₹100",
      src: "/images/hair-care/styling/style-07.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our Beard Setting/Shaving service provides men with professional beard grooming, precise trimming, and clean shaving for a polished, well-groomed appearance.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Precision beard trimming</li>
            <li>Clean shaving techniques</li>
            <li>Beard styling and shaping</li>
            <li>Professional grooming products</li>
          </ul>
        </div>
      )
    },
    {
      title: "Blowdry with Shampoo & Conditioning",
      description: "Complete service with shampoo, conditioning, and blowdry",
      price: "₹200",
      src: "/images/hair-care/styling/style-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Complete hair service for men including professional shampoo, conditioning, and blowdry styling. Perfect for a fresh, styled look.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Professional shampoo & conditioning</li>
            <li>Expert blowdry styling</li>
            <li>Quick and efficient service</li>
            <li>Professional finishing</li>
          </ul>
        </div>
      )
    },
    {
      title: "Ironing with Shampoo & Conditioning",
      description: "Complete service with shampoo, conditioning, and ironing",
      price: "₹300",
      src: "/images/hair-care/styling/style-04.avif",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Complete hair service for men including professional shampoo, conditioning, and ironing for a straight, sleek look.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Professional shampoo & conditioning</li>
            <li>Expert ironing technique</li>
            <li>Heat protection treatment</li>
            <li>Straight, sleek finish</li>
          </ul>
        </div>
      )
    }
  ];

  // Hair Coloring Cards for Expandable Component - Ladies
  const ladiesHairColoringCards = [
    {
      title: "Henna S/M/L",
      description: "Natural henna coloring in small, medium, or large sizes",
      price: "₹600/850/1100",
      src: "/images/hair-care/coloring/color-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Natural henna coloring service available in three sizes - Small, Medium, and Large. Perfect for those who prefer natural, chemical-free hair coloring.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>100% natural henna</li>
            <li>No harmful chemicals</li>
            <li>Conditions hair naturally</li>
            <li>Rich, vibrant color</li>
          </ul>
        </div>
      )
    },
    {
      title: "Global Hair Colouring",
      description: "Complete hair coloring service in three tiers",
      price: "₹2500/3500/4500",
      src: "/images/hair-care/coloring/color-02.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Complete global hair coloring service with three pricing tiers based on hair length and complexity. Professional coloring for stunning results.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Professional color consultation</li>
            <li>Premium coloring products</li>
            <li>Complete color application</li>
            <li>Post-color treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Premium Hair Colouring",
      description: "Luxury hair coloring with premium products",
      price: "₹3500/4500/5500",
      src: "/images/hair-care/coloring/color-03.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Our premium hair coloring service uses the finest products and techniques for exceptional results. Perfect for special occasions or when you want the best.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Luxury coloring products</li>
            <li>Expert colorist consultation</li>
            <li>Advanced coloring techniques</li>
            <li>Premium aftercare treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Root Touchup",
      description: "Professional root color touchup service",
      price: "₹2500",
      src: "/images/hair-care/coloring/color-04.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Professional root touchup service to maintain your color between full coloring sessions. Quick and efficient service for fresh-looking roots.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Precise root application</li>
            <li>Color matching expertise</li>
            <li>Quick service time</li>
            <li>Professional finishing</li>
          </ul>
        </div>
      )
    },
    {
      title: "Root Touchup (Ammonia)",
      description: "Ammonia-based root touchup for stronger color",
      price: "₹2000",
      src: "/images/hair-care/coloring/color-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Ammonia-based root touchup service for stronger, longer-lasting color results. Ideal for those who prefer more permanent color solutions.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Ammonia-based formula</li>
            <li>Stronger color penetration</li>
            <li>Longer-lasting results</li>
            <li>Professional application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Hair Streaking",
      description: "Complete hair streaking service for dramatic look",
      price: "₹4500",
      src: "/images/hair-care/coloring/color-02.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Complete hair streaking service for a dramatic, eye-catching look. Perfect for those who want to make a bold statement with their hair color.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Full head streaking</li>
            <li>Dramatic color contrast</li>
            <li>Professional technique</li>
            <li>Styling included</li>
          </ul>
        </div>
      )
    },
    {
      title: "Highlights + Global",
      description: "Combined highlighting and global coloring service",
      price: "₹6500",
      src: "/images/hair-care/coloring/color-03.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Combined highlighting and global coloring service for a multi-dimensional look. This comprehensive service creates depth and dimension in your hair color.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Global base color</li>
            <li>Strategic highlighting</li>
            <li>Multi-dimensional look</li>
            <li>Professional consultation</li>
          </ul>
        </div>
      )
    },
    {
      title: "No Ammonia",
      description: "Gentle ammonia-free hair coloring service",
      price: "₹4500/5500/6500",
      src: "/images/hair-care/coloring/color-04.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Gentle ammonia-free hair coloring service perfect for those with sensitive scalps or damaged hair. Three pricing tiers available.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Ammonia-free formula</li>
            <li>Gentle on hair and scalp</li>
            <li>Natural-looking results</li>
            <li>Hair-friendly ingredients</li>
          </ul>
        </div>
      )
    },
    {
      title: "Schwarzkopf Highlighting",
      description: "Premium highlighting with Schwarzkopf products",
      price: "₹450+/Streaks",
      src: "/images/hair-care/coloring/color-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Premium highlighting service using Schwarzkopf professional products. Starting from ₹450 per streak with professional application.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Schwarzkopf professional products</li>
            <li>Premium highlighting technique</li>
            <li>Per-streak pricing</li>
            <li>Expert application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Loreal Highlighting",
      description: "Professional highlighting with Loreal products",
      price: "₹350+/Streaks",
      src: "/images/hair-care/coloring/color-02.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Professional highlighting service using Loreal products. Starting from ₹350 per streak with expert colorist application.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Loreal professional products</li>
            <li>Expert highlighting technique</li>
            <li>Affordable per-streak pricing</li>
            <li>Professional consultation</li>
          </ul>
        </div>
      )
    },
    {
      title: "Matrix Highlighting",
      description: "Quality highlighting with Matrix products",
      price: "₹300+/Streaks",
      src: "/images/hair-care/coloring/color-03.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Quality highlighting service using Matrix products. Starting from ₹300 per streak with professional application and consultation.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Matrix professional products</li>
            <li>Quality highlighting technique</li>
            <li>Budget-friendly pricing</li>
            <li>Professional application</li>
          </ul>
        </div>
      )
    }
  ];

  // Hair Coloring Cards for Expandable Component - Gents
  const gentsHairColoringCards = [
    {
      title: "Henna",
      description: "Natural henna coloring for men",
      price: "₹250",
      src: "/images/hair-care/coloring/color-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Natural henna coloring service for men. Perfect for those who prefer chemical-free hair coloring with natural ingredients.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>100% natural henna</li>
            <li>No harmful chemicals</li>
            <li>Quick service</li>
            <li>Natural conditioning</li>
          </ul>
        </div>
      )
    },
    {
      title: "Garnier",
      description: "Garnier hair coloring for men",
      price: "₹350",
      src: "/images/hair-care/coloring/color-02.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Professional hair coloring service using Garnier products. Reliable and affordable coloring solution for men.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Garnier professional products</li>
            <li>Reliable coloring results</li>
            <li>Affordable pricing</li>
            <li>Professional application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Bigen",
      description: "Bigen hair coloring for men",
      price: "₹500",
      src: "/images/hair-care/coloring/color-03.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Professional hair coloring service using Bigen products. Known for excellent coverage and long-lasting results.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Bigen professional products</li>
            <li>Excellent coverage</li>
            <li>Long-lasting results</li>
            <li>Professional technique</li>
          </ul>
        </div>
      )
    },
    {
      title: "Loreal",
      description: "Loreal hair coloring for men",
      price: "₹700",
      src: "/images/hair-care/coloring/color-04.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Premium hair coloring service using Loreal products. High-quality coloring with professional application.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Loreal professional products</li>
            <li>High-quality coloring</li>
            <li>Professional application</li>
            <li>Expert consultation</li>
          </ul>
        </div>
      )
    },
    {
      title: "Schwarzkopf",
      description: "Schwarzkopf hair coloring for men",
      price: "₹700",
      src: "/images/hair-care/coloring/color-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Premium hair coloring service using Schwarzkopf products. Known for superior quality and professional results.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Schwarzkopf professional products</li>
            <li>Superior quality</li>
            <li>Professional results</li>
            <li>Expert application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Loreal (Highlighting)",
      description: "Loreal highlighting service for men",
      price: "₹300/Streaks",
      src: "/images/hair-care/coloring/color-02.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Professional highlighting service for men using Loreal products. Starting from ₹300 per streak.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Loreal professional products</li>
            <li>Per-streak pricing</li>
            <li>Professional highlighting</li>
            <li>Expert application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Matrix (Highlighting)",
      description: "Matrix highlighting service for men",
      price: "₹250/Streaks",
      src: "/images/hair-care/coloring/color-03.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Professional highlighting service for men using Matrix products. Starting from ₹250 per streak.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Matrix professional products</li>
            <li>Affordable per-streak pricing</li>
            <li>Quality highlighting</li>
            <li>Professional application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Global Hair Colouring Schwarzkopf",
      description: "Complete global coloring with Schwarzkopf",
      price: "₹700+",
      src: "/images/hair-care/coloring/color-04.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Complete global hair coloring service for men using Schwarzkopf products. Starting from ₹700 based on hair length.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Schwarzkopf professional products</li>
            <li>Complete global coloring</li>
            <li>Professional consultation</li>
            <li>Expert application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Global Hair Colouring Loreal",
      description: "Complete global coloring with Loreal",
      price: "₹700+",
      src: "/images/hair-care/coloring/color-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Complete global hair coloring service for men using Loreal products. Starting from ₹700 based on hair length.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Loreal professional products</li>
            <li>Complete global coloring</li>
            <li>Professional consultation</li>
            <li>Expert application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Global Hair Colouring Matrix",
      description: "Complete global coloring with Matrix",
      price: "₹600+",
      src: "/images/hair-care/coloring/color-02.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Complete global hair coloring service for men using Matrix products. Starting from ₹600 based on hair length.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Matrix professional products</li>
            <li>Complete global coloring</li>
            <li>Budget-friendly pricing</li>
            <li>Professional application</li>
          </ul>
        </div>
      )
    }
  ];

  // Hair Treatment Cards for Expandable Component - Ladies
  const ladiesHairTreatmentCards = [
    {
      title: "Schwarzkopf Smoothing",
      description: "Premium hair texture treatment with Schwarzkopf",
      price: "₹4000/6000/9000",
      src: "/images/hair-care/styling/style-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Premium hair texture treatment using Schwarzkopf professional products. Available in three tiers for different hair lengths and desired results.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Schwarzkopf professional products</li>
            <li>Advanced smoothing technology</li>
            <li>Long-lasting results</li>
            <li>Expert application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Loreal Smoothing",
      description: "Professional hair texture treatment with Loreal",
      price: "₹4000/5000/8000",
      src: "/images/hair-care/styling/style-04.avif",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Professional hair texture treatment using Loreal products. Three pricing tiers available for different hair lengths and complexity.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Loreal professional products</li>
            <li>Professional smoothing technique</li>
            <li>Quality results</li>
            <li>Expert consultation</li>
          </ul>
        </div>
      )
    },
    {
      title: "Streax Smoothing",
      description: "Quality hair texture treatment with Streax",
      price: "₹3500/5000/7000",
      src: "/images/hair-care/styling/style-07.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Quality hair texture treatment using Streax products. Available in three tiers for different hair lengths and desired outcomes.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Streax professional products</li>
            <li>Quality smoothing technique</li>
            <li>Affordable pricing</li>
            <li>Professional application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Matrix Smoothing",
      description: "Professional hair texture treatment with Matrix",
      price: "₹3700/5200/7500",
      src: "/images/hair-care/styling/style-10.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Professional hair texture treatment using Matrix products. Three pricing tiers available for different hair lengths and complexity levels.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Matrix professional products</li>
            <li>Professional smoothing technique</li>
            <li>Reliable results</li>
            <li>Expert consultation</li>
          </ul>
        </div>
      )
    },
    {
      title: "Keratine S/M/L",
      description: "Premium keratin treatment for hair texture",
      price: "₹6000/8500/9500",
      src: "/images/hair-care/styling/style-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Premium keratin treatment for hair texture available in Small, Medium, and Large sizes. Professional treatment for silky, manageable hair.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Premium keratin formula</li>
            <li>Professional application</li>
            <li>Silky, manageable results</li>
            <li>Long-lasting effects</li>
          </ul>
        </div>
      )
    },
    {
      title: "Botox S/M/L",
      description: "Advanced botox treatment for hair texture",
      price: "₹5000/8000/10000",
      src: "/images/hair-care/styling/style-04.avif",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Advanced botox treatment for hair texture available in Small, Medium, and Large sizes. Professional treatment for smooth, healthy hair.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Advanced botox formula</li>
            <li>Professional application</li>
            <li>Smooth, healthy results</li>
            <li>Premium treatment</li>
          </ul>
        </div>
      )
    },
    {
      title: "Permanent Blowdry S/M/L",
      description: "Permanent blowdry treatment for lasting style",
      price: "₹4000/6000/8000",
      src: "/images/hair-care/styling/style-07.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Permanent blowdry treatment available in Small, Medium, and Large sizes. Professional treatment for lasting, styled hair.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Permanent styling technique</li>
            <li>Professional application</li>
            <li>Lasting styled results</li>
            <li>Expert consultation</li>
          </ul>
        </div>
      )
    },
    {
      title: "Hair Spa S/M/L",
      description: "Rejuvenating hair spa treatment in three sizes",
      price: "₹850/1050/1200",
      src: "/images/hair-care/styling/style-10.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Rejuvenating hair spa treatment available in Small, Medium, and Large sizes. Perfect for nourishing and revitalizing your hair.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Rejuvenating spa treatment</li>
            <li>Hair nourishment</li>
            <li>Scalp massage included</li>
            <li>Premium spa products</li>
          </ul>
        </div>
      )
    },
    {
      title: "Nutrition Spa",
      description: "Deep nutrition treatment for healthy hair",
      price: "₹1500",
      src: "/images/hair-care/styling/style-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Deep nutrition treatment designed to provide essential nutrients to your hair. Perfect for maintaining healthy, strong hair.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Deep nutrition treatment</li>
            <li>Essential hair nutrients</li>
            <li>Healthy hair maintenance</li>
            <li>Professional application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Repair Spa",
      description: "Specialized treatment for dry and damaged hair",
      price: "₹1700",
      src: "/images/hair-care/styling/style-04.avif",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Specialized repair spa treatment designed specifically for dry and damaged hair. Restores health and vitality to damaged hair.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Specialized repair treatment</li>
            <li>For dry and damaged hair</li>
            <li>Hair restoration</li>
            <li>Professional repair products</li>
          </ul>
        </div>
      )
    },
    {
      title: "After Care for Smoothened Hair",
      description: "Specialized aftercare for smoothened hair",
      price: "₹1700",
      src: "/images/hair-care/styling/style-07.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Specialized aftercare treatment designed specifically for smoothened hair. Maintains and extends the life of your smoothing treatment.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Specialized aftercare</li>
            <li>For smoothened hair</li>
            <li>Treatment maintenance</li>
            <li>Professional care products</li>
          </ul>
        </div>
      )
    },
    {
      title: "Anti Breaking Problem Treatment",
      description: "Treatment to prevent hair breakage",
      price: "₹1650",
      src: "/images/hair-care/styling/style-10.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Specialized treatment designed to prevent hair breakage and strengthen weak hair. Perfect for those experiencing hair breakage issues.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Anti-breakage treatment</li>
            <li>Hair strengthening</li>
            <li>Prevents breakage</li>
            <li>Professional strengthening products</li>
          </ul>
        </div>
      )
    },
    {
      title: "Anti Dandruff Treatment",
      description: "Specialized treatment for dandruff control",
      price: "₹1200/1500",
      src: "/images/hair-care/styling/style-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Specialized anti-dandruff treatment designed to control and eliminate dandruff. Two pricing tiers available based on severity.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Anti-dandruff treatment</li>
            <li>Dandruff control</li>
            <li>Scalp health improvement</li>
            <li>Professional anti-dandruff products</li>
          </ul>
        </div>
      )
    },
    {
      title: "Anti Hairfall",
      description: "Treatment to prevent hair fall and promote growth",
      price: "₹1000/1600/2000",
      src: "/images/hair-care/styling/style-04.avif",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Specialized anti-hairfall treatment designed to prevent hair loss and promote healthy hair growth. Three pricing tiers available.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Anti-hairfall treatment</li>
            <li>Hair loss prevention</li>
            <li>Promotes hair growth</li>
            <li>Professional growth products</li>
          </ul>
        </div>
      )
    }
  ];

  // Hair Treatment Cards for Expandable Component - Gents
  const gentsHairTreatmentCards = [
    {
      title: "Loreal",
      description: "Front portion smoothening with Loreal",
      price: "₹900",
      src: "/images/hair-care/styling/style-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Front portion smoothening treatment using Loreal products. Perfect for men who want smooth, styled front hair.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Loreal professional products</li>
            <li>Front portion smoothening</li>
            <li>Professional application</li>
            <li>Quality results</li>
          </ul>
        </div>
      )
    },
    {
      title: "Matrix",
      description: "Front portion smoothening with Matrix",
      price: "₹800",
      src: "/images/hair-care/styling/style-04.avif",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Front portion smoothening treatment using Matrix products. Affordable option for men's front hair styling.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Matrix professional products</li>
            <li>Front portion smoothening</li>
            <li>Affordable pricing</li>
            <li>Professional application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Schwarzkopf",
      description: "Front portion smoothening with Schwarzkopf",
      price: "₹900",
      src: "/images/hair-care/styling/style-07.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Front portion smoothening treatment using Schwarzkopf products. Premium option for men's front hair styling.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Schwarzkopf professional products</li>
            <li>Front portion smoothening</li>
            <li>Premium quality</li>
            <li>Professional application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Hair Smoothening (Schwarzkopf)",
      description: "Complete hair smoothening with Schwarzkopf",
      price: "₹2500/3000",
      src: "/images/hair-care/styling/style-10.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Complete hair smoothening treatment using Schwarzkopf products. Two pricing tiers available for different hair lengths.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Schwarzkopf professional products</li>
            <li>Complete hair smoothening</li>
            <li>Premium quality results</li>
            <li>Professional application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Hair Smoothening (Loreal)",
      description: "Complete hair smoothening with Loreal",
      price: "₹2500/3000",
      src: "/images/hair-care/styling/style-01.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Complete hair smoothening treatment using Loreal products. Two pricing tiers available for different hair lengths.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Loreal professional products</li>
            <li>Complete hair smoothening</li>
            <li>Quality results</li>
            <li>Professional application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Full Hair Smoothening (Matrix)",
      description: "Complete hair smoothening with Matrix",
      price: "₹2200/2700",
      src: "/images/hair-care/styling/style-04.avif",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Complete hair smoothening treatment using Matrix products. Two pricing tiers available for different hair lengths.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Matrix professional products</li>
            <li>Complete hair smoothening</li>
            <li>Affordable pricing</li>
            <li>Professional application</li>
          </ul>
        </div>
      )
    },
    {
      title: "Keratine",
      description: "Premium keratin treatment for men",
      price: "₹3000+",
      src: "/images/hair-care/styling/style-07.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Premium keratin treatment for men. Starting from ₹3000 based on hair length and complexity of treatment.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Premium keratin formula</li>
            <li>Professional application</li>
            <li>Silky, manageable results</li>
            <li>Long-lasting effects</li>
          </ul>
        </div>
      )
    },
    {
      title: "Botox",
      description: "Advanced botox treatment for men",
      price: "₹4000+",
      src: "/images/hair-care/styling/style-10.webp",
      ctaText: "Book Now",
      ctaLink: siteConfig.contact.whatsapp,
      content: () => (
        <div>
          <p className="mb-4">
            Advanced botox treatment for men. Starting from ₹4000 based on hair length and complexity of treatment.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Advanced botox formula</li>
            <li>Professional application</li>
            <li>Smooth, healthy results</li>
            <li>Premium treatment</li>
          </ul>
        </div>
      )
    }
  ];

  const hairColorImages = [
    {
      src: '/images/hair-care/coloring/color-01.webp',
      alt: 'Professional hair coloring service',
      title: 'Single Color'
    },
    {
      src: '/images/hair-care/coloring/color-02.webp',
      alt: 'Beautiful hair highlights',
      title: 'Highlights'
    },
    {
      src: '/images/hair-care/coloring/color-03.webp',
      alt: 'Hand-painted balayage highlights',
      title: 'Balayage'
    },
    {
      src: '/images/hair-care/coloring/color-04.webp',
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
        backgroundImage="/images/hair-care/styling/style-04.avif"
      />

      {/* Hair Cuts Section */}
      <section className="hair-cuts-section">
        <OptimizedSectionHero
          title="Hair Cuts & Styling"
          description="Transform your look with our expert cutting techniques and modern styling approaches."
        />



        {/* Hair Cuts Section */}
        <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              
              {/* Enhanced Writeup Section */}
              <div className="w-full mb-12">
                <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-gray-800">
                  <div className="w-full">
                    <div className="text-center">
                      <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        At <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">BA-BU Salon</span>, we provide professional hair cutting services for everyone. Our expert stylists and barbers ensure precision, elegance, and perfect results for both men and women. Whether you're looking for a trendy new style, a classic cut, or a complete transformation, we use top professional products and the latest techniques to create looks that suit your face shape, hair texture, and lifestyle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ladies Hair Cut Pricing - Expandable Cards */}
              <div className="mb-6">
                <h5 className="text-lg font-gunteerz font-semibold text-white text-left">
                  For Ladies
                </h5>
              </div>
              <ExpandableHairCutCards cards={hairCutCards} gender="female" onBookNow={handleBookNow} />

              {/* Gents Hair Cut Pricing - Expandable Cards */}
              <div className="mb-6 mt-12">
                <h5 className="text-lg font-gunteerz font-semibold text-white text-left">
                  For Gents
                </h5>
              </div>
              <ExpandableHairCutCards cards={gentsHairCutCards} gender="male" onBookNow={handleBookNow} />
            </div>
          </div>
        </div>

        {/* Hair Cut Styles Gallery - Infinite Scroll */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-gunteerz font-bold text-white mb-4">
                Our Hair Cut Styles
              </h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
                Browse through our collection of stunning haircuts and styles
              </p>
            </div>

            {/* Infinite Scroll Gallery */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right">
                {/* First set of images */}
                {hairCutImages.map((image, index) => (
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
                {hairCutImages.map((image, index) => (
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

      {/* Hair Coloring Section */}
      <section className="hair-coloring-section">
        <OptimizedSectionHero
          title="Hair Coloring"
          description="Transform your hair with our professional coloring services and stunning highlight techniques."
          backgroundClass="bg-gradient-to-br from-gray-900 via-black to-gray-900"
        />

        {/* Hair Coloring Section */}
        <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h4 className="text-2xl sm:text-3xl font-gunteerz font-bold text-white mb-8 text-center">
                Hair Coloring
              </h4>
              
              {/* Enhanced Writeup Section */}
              <div className="w-full mb-12">
                <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-gray-800">
                  <div className="w-full">
                    <div className="text-center">
                      <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        At <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">BA-BU Salon</span>, our expert colorists offer professional hair coloring services including highlighting, global color, henna treatments, balayage, and more. Using premium products, we ensure vibrant, lasting color that enhances your natural beauty while protecting your hair's health. Whether you want a subtle touch-up or a bold new shade, we tailor every color to suit your style and skin tone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ladies Hair Coloring Pricing - Expandable Cards */}
              <div className="mb-6">
                <h5 className="text-lg font-gunteerz font-semibold text-white text-left">
                  For Ladies
                </h5>
              </div>
              <ExpandableHairCutCards cards={ladiesHairColoringCards} gender="female" onBookNow={handleBookNow} />

              {/* Gents Hair Coloring Pricing - Expandable Cards */}
              <div className="mb-6 mt-12">
                <h5 className="text-lg font-gunteerz font-semibold text-white text-left">
                  For Gents
                </h5>
              </div>
              <ExpandableHairCutCards cards={gentsHairColoringCards} gender="male" onBookNow={handleBookNow} />
            </div>
          </div>
        </div>

        {/* Hair Color Styles Gallery - Infinite Scroll */}
        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-gunteerz font-bold text-white mb-4">
                Our Hair Color Styles
              </h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
                Explore our collection of beautiful hair colors and highlights
              </p>
            </div>

            {/* Infinite Scroll Gallery */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right">
                {/* First set of images */}
                {hairColorImages.map((image, index) => (
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
                {hairColorImages.map((image, index) => (
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

      {/* Hair Treatments Section */}
      <section className="hair-treatments-section">
        <OptimizedSectionHero
          title="Hair Treatments"
          description="Revitalizing treatments designed to nourish, repair, and strengthen your hair with premium products and expert techniques."
          backgroundClass="bg-gradient-to-br from-gray-900 via-black to-gray-900"
        />

        {/* Hair Treatments Section */}
        <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              
              {/* Enhanced Writeup Section */}
              <div className="w-full mb-12">
                <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-gray-800">
                  <div className="w-full">
                    <div className="text-center">
                      <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        Experience revitalizing hair treatments at <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">BA-BU Salon</span> designed to nourish, repair, and strengthen your hair. From anti-dandruff and protein treatments to deep hair spas and scalp care, our customized therapies restore health and shine to all hair types. Let our experts rejuvenate your hair with the latest techniques and premium products for silky, manageable locks every day.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ladies Hair Treatments Pricing - Expandable Cards */}
              <div className="mb-6">
                <h5 className="text-lg font-gunteerz font-semibold text-white text-left">
                  For Ladies
                </h5>
              </div>
              <ExpandableHairCutCards cards={ladiesHairTreatmentCards} gender="female" onBookNow={handleBookNow} />

              {/* Gents Hair Treatments Pricing - Expandable Cards */}
              <div className="mb-6 mt-12">
                <h5 className="text-lg font-gunteerz font-semibold text-white text-left">
                  For Gents
                </h5>
              </div>
              <ExpandableHairCutCards cards={gentsHairTreatmentCards} gender="male" onBookNow={handleBookNow} />
            </div>
          </div>
        </div>
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

      {/* Explore Other Services - Interactive Hero (Weddings & Skin) */}
      <ServicesContainer
        serviceSectionsOverride={[
          {
            id: "weddings",
            title: "Wedding Services",
            backgroundImage: "/images/weddings/gallery/wedding-08.webp",
          },
          {
            id: "skin-body-care",
            title: "Skin & Body Care",
            backgroundImage: "/images/engin-akyurt-35NAaB_Nmx8-unsplash.webp",
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

export default HairCareServicePage;
