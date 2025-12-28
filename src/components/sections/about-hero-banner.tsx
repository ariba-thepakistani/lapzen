"use client";

import React, { useEffect, useState } from 'react';

/**
 * AboutHeroBanner Component
 * 
 * Clones the hero banner section from the Lapzen About page.
 * Features:
 * - Full-width layout with the brand logo image centered on a white background.
 * - Zoom-in animation effect on the brand image.
 * - Fade-in and slide-up animation for the entire section on load.
 * - Responsive height values matching the 'banner--small' configuration.
 */
const AboutHeroBanner = () => {
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    // Trigger animations slightly after mount to ensure transitions are visible
    const timer = setTimeout(() => {
      setIsAnimate(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="shopify-section-template--19902179049696__image-banner" 
      className="shopify-section section w-full overflow-hidden bg-white"
    >
      <div 
        id="Banner-template--19902179049696__image-banner" 
        className={`
          relative 
          w-full 
          overflow-hidden 
          bg-white 
          min-h-[260px] 
          sm:min-h-[420px] 
          md:min-h-[500px] 
          lg:min-h-[600px] 
          transition-all 
          duration-[1200ms] 
          ease-out 
          ${isAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        {/* Media Layer: Contains the image with the zoom-in effect */}
        <div 
          className={`
            banner__media 
            media 
            absolute 
            inset-0 
            w-full 
            h-full 
            flex 
            items-center 
            justify-center 
            overflow-hidden 
            transition-transform 
            duration-[4000ms] 
            ease-out
            ${isAnimate ? 'scale-110' : 'scale-100'}
          `}
        >
          <img 
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/images/347e75bb-ec5b-455b-be95-96a1d46d0742-1.png" 
            alt="Lapzen Brand Banner" 
            className="w-full h-full object-contain pointer-events-none select-none"
            loading="eager"
            width={3840}
            height={1024}
          />
        </div>

        {/* Content Layer (Empty spacer to replicate HTML structure and maintain alignment) */}
        <div className="banner__content banner__content--middle-center page-width relative z-10 w-full h-full flex items-center justify-center max-w-[1200px] mx-auto px-5 pointer-events-none">
          <div className="banner__box content-container content-container--full-width-mobile bg-transparent border-none shadow-none">
            {/* 
              This box is intentionally empty to match the original DOM structure 
              where this hero section serves as a purely visual brand banner. 
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroBanner;