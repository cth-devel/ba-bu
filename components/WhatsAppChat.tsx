'use client';

import { WhatsAppIcon } from '@/components/Icons';
import { siteConfig } from '@/config/site';

const WhatsAppChat = () => {
  const handleWhatsAppClick = () => {
    // Use wa.me which opens WhatsApp app on mobile and web on desktop
    const phoneNumber = "919846272333";
    const message = "Hi! I would like to know more about your services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
    }
  };

  return (
    <div className="fixed bottom-20 left-10 z-50 lg:bottom-6 lg:left-6 w-auto">
                   <button
               onClick={handleWhatsAppClick}
               className="bg-[#25D366] hover:bg-[#1ebe57] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
               style={{ animation: 'slowPulse 3s ease-in-out infinite' }}
               aria-label="Chat on WhatsApp"
             >
        <WhatsAppIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default WhatsAppChat;
