'use client';

import './AnimatedButton.css';

interface AnimatedButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const AnimatedButton = ({ text, onClick, className = '' }: AnimatedButtonProps) => {
  return (
    <button
      className={`Btn ${className}`}
      onClick={onClick}
    >
      <span className="button-text tracking-widest">{text}</span>
    </button>
  );
};

export default AnimatedButton;
