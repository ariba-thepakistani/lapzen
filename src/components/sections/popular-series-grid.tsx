"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * PopularSeriesSection component clones the "Shop by Popular Series" section of Lapzen.
 * It features a grid of cards for popular laptop series with high-tech "glassmorphism" styling.
 * 
 * Design Details:
 * - Theme: Dark (Deep navy background #001B34)
 * - Container: Max-width 1440px
 * - Typography: Inter (Sans-serif), uppercase headings
 * - Cards: Rounded corners (20px), glassmorphism effect, hover lift animation
 * - Layout: Responsive grid (1 col mobile, 2 col tablet, 4 col desktop)
 */

const PopularSeriesSection = () => {
  const series = [
    {
      title: "HP EliteBooks",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/images/Blue_Best_Laptops_Review_YouTube_Thumbnail_Website-12.png",
      href: "/catalog?series=EliteBook",
      subtext: null
    },
    {
      title: "Apple MacBook",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/images/Blue_Best_Laptops_Review_YouTube_Thumbnail_Website-12.png",
      href: "/catalog?brand=Apple",
      subtext: null
    },
    {
      title: "Dell Latitude",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/images/Blue_Best_Laptops_Review_YouTube_Thumbnail_Website-12.png",
      href: "/catalog?series=Latitude",
      subtext: "Latitude series. Best in Performance, Cheaper in Price"
    },
    {
      title: "Lenovo ThinkPad",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/images/Blue_Best_Laptops_Review_YouTube_Thumbnail_Website-12.png",
      href: "/catalog?series=ThinkPad",
      subtext: null
    }
  ];

  return (
    <section className="w-full overflow-hidden">
      <div className="container">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2>
            Shop by Popular Series
          </h2>
        </div>

        {/* Popular Series Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {series.map((item, index) => (
            <Link key={index} href={item.href} className="group cursor-pointer flex flex-col items-center">
              {/* Card Image Wrapper with Glassmorphism and Hover Effect */}
              <div className="relative w-full overflow-hidden rounded-[20px] glass-card aspect-[16/10] mb-[15px] md:mb-[20px] animate-hover-lift">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  priority={index < 4}
                />
                {/* Bottom shadow overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
              </div>

              {/* Card Content */}
              <div className="text-center w-full px-2">
                  <div className="inline-flex items-center justify-center gap-2 group">
                    <h3 className="text-[16px] md:text-[18px] font-medium uppercase tracking-[0.02em] text-foreground transition-colors duration-300 group-hover:text-foreground/70">
                      {item.title}
                    </h3>
                    <ArrowRight 
                      className="w-4 h-4 text-foreground transition-transform duration-300 group-hover:translate-x-1.5" 
                      strokeWidth={2.5}
                    />
                  </div>
                  
                  {/* Conditional subtext for specific series */}
                  {item.subtext && (
                    <p className="text-[13px] md:text-[14px] text-muted-foreground font-normal leading-relaxed mt-2 max-w-[240px] mx-auto italic">
                      {item.subtext}
                    </p>
                  )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSeriesSection;
