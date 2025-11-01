'use client';

import React, { useState } from "react";
import { FemaleIcon, MaleIcon, CloseIcon, ArrowRightIcon } from "./Icons";

interface SkinCareCard {
  title: string;
  price: string;
  duration: string;
  contentData: {
    description: string;
    features: string[];
  };
  ctaLink?: string;
  content?: () => React.ReactNode;
}

interface ExpandableSkinCareCardsProps {
  cards: SkinCareCard[];
  gender?: 'male' | 'female' | 'unisex';
  onBookNow: (title: string, price: string, gender: string) => void;
  showLoadMore?: boolean;
}

const ExpandableSkinCareCards = ({ cards, gender = 'female', onBookNow, showLoadMore = false }: ExpandableSkinCareCardsProps) => {
  const [active, setActive] = useState<SkinCareCard | null>(null);

  const handleCardClick = (card: SkinCareCard) => {
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

  const getGenderIcon = () => {
    switch (gender) {
      case 'male':
        return <MaleIcon className="w-4 h-4" />;
      case 'female':
        return <FemaleIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getGenderColor = () => {
    switch (gender) {
      case 'male':
        return 'text-blue-400';
      case 'female':
        return 'text-pink-400';
      default:
        return 'text-purple-400';
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      {active && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[90vh]">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">{active.title}</h3>
                  {getGenderIcon() && (
                    <div className={getGenderColor()}>
                      {getGenderIcon()}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-semibold text-lg text-green-600">{active.price}</span>
                  <span>•</span>
                  <span>{active.duration}</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 mb-4">{active.contentData.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {active.contentData.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onBookNow(active.title, active.price, gender);
                    handleCloseModal();
                  }}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  Book Now
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card)}
            className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl p-6 border border-gray-800 cursor-pointer hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-semibold text-white group-hover:text-[#ffd277] transition-colors">
                  {card.title}
                </h4>
                {getGenderIcon() && (
                  <div className={getGenderColor()}>
                    {getGenderIcon()}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-[#ffd277]">{card.price}</div>
                <div className="text-sm text-gray-400">{card.duration}</div>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
              {card.contentData.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                {card.contentData.features.length} services included
              </div>
              <div className="text-[#ffd277] group-hover:text-white transition-colors">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExpandableSkinCareCards;

