'use client';

import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';

const WhatsAppChat = () => {
  const handleWhatsAppClick = () => {
    window.open(siteConfig.contact.whatsapp, '_blank');
  };

  return (
    <div className="fixed bottom-20 left-10 z-50 lg:bottom-6 lg:left-6 w-auto">
                   <button
               onClick={handleWhatsAppClick}
               className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
               style={{ animation: 'slowPulse 3s ease-in-out infinite' }}
               aria-label="Chat on WhatsApp"
             >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default WhatsAppChat;
