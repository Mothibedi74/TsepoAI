import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 cursor-pointer">
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="TsepoAI Logo">
        <rect width="100" height="100" rx="12" fill="#007bff"/>
        <path d="M25 25H75V35H55V75H45V35H25V25Z" fill="white"/>
        <path d="M60 55L70 65L60 75" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M40 75L30 65L40 55" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-2xl font-bold tracking-tight text-white">TsepoAI</span>
    </div>
  );
};

export default Logo;