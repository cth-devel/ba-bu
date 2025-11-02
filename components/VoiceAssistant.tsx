'use client';

import { useState } from 'react';
import { MicrophoneIcon } from './Icons';
import VoiceChatInterface from './VoiceChatInterface';

const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleVoiceAssistantClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-20 right-10 z-50 lg:bottom-6 lg:right-6 w-auto">
        <button
          onClick={handleVoiceAssistantClick}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          style={{ animation: 'slowPulse 3s ease-in-out infinite' }}
          aria-label="Open Voice Assistant"
          tabIndex={0}
        >
          <MicrophoneIcon className="w-6 h-6" />
        </button>
      </div>
      <VoiceChatInterface isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default VoiceAssistant;

