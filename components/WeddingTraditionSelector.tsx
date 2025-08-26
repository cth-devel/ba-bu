'use client';

import { WeddingTradition } from '@/data/weddingData';

interface WeddingTraditionSelectorProps {
  traditions: WeddingTradition[];
  selectedTradition: string;
  onTraditionChange: (traditionId: string) => void;
  className?: string;
}

const WeddingTraditionSelector = ({
  traditions,
  selectedTradition,
  onTraditionChange,
  className = '',
}: WeddingTraditionSelectorProps) => {
  return (
    <div id="wedding-tradition-selector" className={`flex justify-center items-center space-x-4 mb-12 ${className}`}>
      {traditions.map((tradition) => (
        <button
          key={tradition.id}
          onClick={() => onTraditionChange(tradition.id)}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
            selectedTradition === tradition.id
              ? 'bg-secondary text-primary shadow-lg'
              : 'bg-gray-800 text-white hover:bg-secondary/80'
          }`}
        >
          {tradition.name}
        </button>
      ))}
    </div>
  );
};

export default WeddingTraditionSelector;