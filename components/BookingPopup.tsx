'use client';

import React, { useState } from "react";
import { CloseIcon, CalendarIcon } from "./Icons";

interface ServiceDetails {
  title: string;
  price: string;
  gender: string;
}

interface BookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  serviceDetails: ServiceDetails | null;
}

const BookingPopup = ({ isOpen, onClose, serviceDetails }: BookingPopupProps) => {
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
      <div className="bg-white rounded-3xl max-w-md sm:max-w-lg w-full max-h-[90vh] overflow-hidden relative shadow-2xl border border-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-200"
        >
          <CloseIcon className="w-6 h-6 text-gray-500" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="golden-gradient-button w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Book Appointment</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3">Service: {serviceDetails?.title}</p>
            <div className="bg-gray-50 rounded-xl p-2 sm:p-3 inline-block">
              <p className="text-lg sm:text-xl font-bold text-gray-800">{serviceDetails?.price}</p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                Your Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#77530a] focus:border-[#77530a] transition-all duration-200 text-base sm:text-lg text-gray-900 bg-white"
                placeholder="Enter your full name"
              />
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                Select Date *
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#77530a] focus:border-[#77530a] transition-all duration-200 text-base sm:text-lg text-gray-900 bg-white"
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                Select Time *
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-3 sm:px-4 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#77530a] focus:border-[#77530a] transition-all duration-200 text-base sm:text-lg text-gray-900 bg-white"
              >
                <option value="">Choose a time slot</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

      {/* Action Buttons */}
      <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 sm:px-6 sm:py-4 text-gray-600 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            className="flex-1 px-4 py-3 sm:px-6 sm:py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
          >
            📱 WhatsApp
          </button>
        </div>

        {/* Call Now Button */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 font-medium">Or call us directly:</p>
          <a
            href="tel:+919846272333"
            className="inline-flex items-center justify-center w-full px-4 py-3 sm:px-6 sm:py-4 golden-gradient-button text-black rounded-xl hover:shadow-xl transition-all duration-300 font-bold shadow-lg transform hover:scale-105 text-sm sm:text-base"
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

export default BookingPopup;
