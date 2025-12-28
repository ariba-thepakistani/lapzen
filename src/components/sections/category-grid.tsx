import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * CategoryGrid Component
 * Clones the "Shop by Categories" section with a 3-column grid of visual category cards.
 * Adheres strictly to the 'dark' theme as requested.
 */
const CategoryGrid = () => {
    const categories = [
      {
        title: "Gaming",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/images/Blue_Best_Laptops_Review_YouTube_Thumbnail_Website-6.png",
        href: "/catalog?category=Gaming",
      },
      {
        title: "Professional",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/images/professional_1_f4e9e255-5ae0-4b40-b6ff-9ea9fbe30dc-11.jpg",
        href: "/catalog?category=Professional",
      },
      {
        title: "Workstations",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/images/Web_Photo_Editor_1_e7792fcb-2dc1-4ff3-bf73-fd55fbd-7.jpg",
        href: "/catalog?search=Workstation",
      },
      {
        title: "Business",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/images/student_e2aa9a04-859b-41e2-a8b7-b714ec960f08-8.png",
        href: "/catalog?category=Business",
      },
      {
        title: "2-in-1",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/images/wmremove-transformed-Picsart-AiImageEnhancer_1_fc7-10.png",
        href: "/catalog?category=2-in-1",
      },
      {
        title: "All Laptops",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2070&auto=format&fit=crop",
        href: "/catalog",
      },
    ];

  return (
    <section className="px-6">
      <div className="container">
        {/* Section Heading */}
        <h2 className="text-center mb-12">
          Shop by Categories
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
              <Link 
                key={index} 
                href={category.href}
                className="group flex flex-col items-center animate-hover-lift"
              >
                {/* Card Media Wrapper */}
                <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden border border-black/5 bg-card">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={index < 3}
                  />
                  {/* Subtle Glass Overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none" />
                </div>

                {/* Card Label */}
                <h3 className="text-[18px] font-medium uppercase text-center mt-[16px] flex items-center gap-[8px] transition-colors text-foreground group-hover:text-foreground/70">
                  {category.title}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </h3>
              </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;