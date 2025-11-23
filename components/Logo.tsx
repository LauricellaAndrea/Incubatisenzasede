import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Custom SVG recreating the Startup Geeks Logo */}
      <div className="relative w-12 h-12 flex-shrink-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Red Cloud/Smoke - Bottom Left */}
          <path 
            d="M25 80C18 80 12 75 12 68C12 63 15 59 19 57C19 50 24 45 32 45C33 45 34 45.2 35 45.5C38 39 45 38 50 42L35 70L25 80Z" 
            fill="#FF3333" 
          />
          <circle cx="20" cy="70" r="10" fill="#FF3333" />
          <circle cx="35" cy="75" r="8" fill="#FF3333" />
          <circle cx="45" cy="78" r="6" fill="#FF3333" />

          {/* Blue Rocket Body */}
          <path 
            d="M50 42C50 42 60 25 80 25C85 25 88 28 88 33C88 53 70 65 70 65L50 42Z" 
            fill="#0F355C" 
          />
          
          {/* Rocket Window/Details */}
          <circle cx="75" cy="35" r="3" fill="#FF3333" />
          <circle cx="68" cy="42" r="3" fill="#FF3333" />
          
          {/* Rocket Fins/Structure */}
          <path d="M50 42L45 55L55 58L70 65" fill="#0F355C" />
          
          {/* Motion lines/Tail */}
          <path d="M40 60L28 82" stroke="#FF3333" strokeWidth="4" strokeLinecap="round" />
          <path d="M46 62L36 82" stroke="#FF3333" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      
      {/* Text Part */}
      <div className="flex flex-col justify-center leading-none">
        <span className="text-2xl font-black text-geeks-blue tracking-tight uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>STARTUP</span>
        <span className="text-2xl font-black text-geeks-blue tracking-tight uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>GEEKS</span>
      </div>
    </div>
  );
};