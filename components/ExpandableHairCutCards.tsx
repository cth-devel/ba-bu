'use client';

import React, { useState } from "react";
import { FemaleIcon, MaleIcon, CloseIcon, ArrowRightIcon } from "./Icons";

interface HairCutCard {
  title: string;
  description: string;
  price: string;
  src: string;
  ctaText: string;
  content: string | (() => React.ReactNode);
}

interface ExpandableHairCutCardsProps {
  cards: HairCutCard[];
  gender?: 'male' | 'female';
  onBookNow: (title: string, price: string, gender: string) => void;
  showLoadMore?: boolean;
}

const ExpandableHairCutCards = ({ cards, gender = 'female', onBookNow, showLoadMore = false }: ExpandableHairCutCardsProps) => {
  const [active, setActive] = useState<HairCutCard | null>(null);

  const handleCardClick = (card: HairCutCard) => {
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
              <CloseIcon />
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
                  <FemaleIcon className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="absolute top-4 right-16 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <MaleIcon className="w-5 h-5 text-white" />
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

      {/* Responsive Layout: Card style for mobile (stacked sections), List style for desktop (side-by-side) */}
      <div className="w-full">
        {/* Mobile Card Layout (when sections are stacked vertically) - Always show on mobile */}
        <div className="grid lg:hidden grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {cards.map((card, index) => (
            <div
              key={`card-${card.title}-${index}`}
              onClick={() => handleCardClick(card)}
              className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden cursor-pointer border border-gray-700 shadow-lg hover:shadow-xl hover:shadow-[#ffd277]/20 transition-all duration-300 transform hover:scale-[1.02] hover:border-[#ffd277]/30"
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={card.src}
                  alt={card.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Gender Symbol */}
                {gender === 'female' ? (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <FemaleIcon className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <MaleIcon className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="text-lg font-bold text-white tracking-wider">
                    {card.price}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="font-bold text-white text-xl mb-2 tracking-wide group-hover:text-[#ffd277] transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
                  {card.description}
                </p>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookNow(card.title, card.price, gender);
                  }}
                  className="group/btn relative w-full px-6 py-3 text-sm font-semibold rounded-xl overflow-hidden text-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 tracking-wider golden-gradient-button"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>{card.ctaText}</span>
                    <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop List Layout (when sections are side-by-side) - Always show on desktop */}
        <div className="hidden lg:block space-y-3">
          {cards.map((card, index) => (
            <div
              key={`card-${card.title}-${index}`}
              onClick={() => handleCardClick(card)}
              className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 hover:bg-gray-800 rounded-xl cursor-pointer border border-gray-700 shadow-sm hover:shadow-md bg-gradient-to-r from-gray-900 to-gray-800 font-sans"
            >
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                <div className="relative flex-shrink-0">
                  <img
                    width={80}
                    height={80}
                    src={card.src}
                    alt={card.title}
                    className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg object-cover object-top"
                  />
                  {/* Gender Symbol */}
                  {gender === 'female' ? (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                      <FemaleIcon className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <MaleIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-white text-base sm:text-lg md:text-xl break-words tracking-wide">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base break-words">
                    {card.description}
                  </p>
                  <div className="text-xl sm:text-2xl font-medium text-white mt-1 tracking-wider">
                    {card.price}
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBookNow(card.title, card.price, gender);
                }}
                className="group relative w-full sm:w-auto sm:min-w-[140px] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-xl overflow-hidden text-black transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#ffd277]/25 transform hover:scale-105 active:scale-95 tracking-widest golden-gradient-button"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>{card.ctaText}</span>
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExpandableHairCutCards;
