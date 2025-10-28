import React from 'react';

interface IconProps {
  className?: string;
}

export const FemaleIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 14v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 18h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

