"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X, Facebook, Instagram, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";

const AnnouncementBar = () => {
  return (
    <div className="bg-[#002b5c] overflow-hidden py-2 px-4 relative flex items-center h-[36px]">
      <div className="flex-1 overflow-hidden relative">
        <div className="marquee-content whitespace-nowrap flex">
          {[...Array(10)].map((_, i) =>
          <span key={i} className="text-white text-[12px] font-medium inline-block mx-8">
              Get Free Delivery across all Pakistan!
            </span>
          )}
        </div>
      </div>
      <a
        href="#"
        className="text-white text-[12px] font-bold underline ml-4 hover:opacity-80 transition-opacity whitespace-nowrap z-10">

        Shop now!
      </a>
    </div>);

};

const Header = () => {
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500 transform",
      visible ? "translate-y-0" : "-translate-y-full"
    )}>
      {!scrolled && <AnnouncementBar />}
      
      <header className={cn(
        "transition-all duration-300 flex items-center border-b border-black/5",
        scrolled ?
        "h-[65px] bg-white/95 backdrop-blur-md shadow-sm" :
        "h-[80px] lg:h-[90px] bg-white/80 backdrop-blur-sm"
      )}>
        <div className="container mx-auto px-5 lg:px-8 max-w-[1200px] flex items-center justify-between">
          
          {/* Logo and Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-slate-900"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu">

              <Menu size={24} />
            </button>
            <Link href="/" className="block">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/svgs/347e75bb-ec5b-455b-be95-96a1d46d0742_096381d0-0717-1.svg"
                alt="Lapzen"
                width={40}
                height={12}
                className="h-[40px] w-auto lg:h-[48px]"
                priority />

            </Link>
          </div>

          {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 ml-8 flex-1">
              <Link href="/" className="nav-link text-slate-900 text-[14px] font-semibold hover:text-blue-700 transition-colors">
                Home
              </Link>
                <Link href="/catalog" className="nav-link text-slate-900 text-[14px] font-semibold hover:text-blue-700 transition-colors">
                  Catalog
                </Link>
              <Link href="/collections" className="nav-link text-slate-900 text-[14px] font-semibold hover:text-blue-700 transition-colors">
                Collections
              </Link>
                <Link href="/contact-us" className="nav-link text-slate-900 text-[14px] font-semibold hover:text-blue-700 transition-colors">
                  Contact
                </Link>
                <Link href="/about" className="nav-link text-slate-900 text-[14px] font-semibold hover:text-blue-700 transition-colors">
                  About
                </Link>
                  <Link
              href="/admin"
              className="ml-4 bg-navy text-[#00172E] px-5 py-2.5 rounded-full text-[13px] font-bold hover:bg-navy/90 transition-all shadow-sm flex items-center gap-2">

                    Admin Panel
                  </Link>
                </nav>

          {/* Desktop Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Social Icons - Desktop */}
            <div className="hidden lg:flex items-center gap-3 border-r border-black/10 pr-6 mr-2">
              <a
                href="https://web.facebook.com/lap.lapzen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#ff0000] hover:text-white transition-all duration-300">

                <Facebook size={16} fill="currentColor" strokeWidth={0} />
              </a>
              <a
                href="https://www.instagram.com/lapzenstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#ff0000] hover:text-white transition-all duration-300">

                <Instagram size={16} />
              </a>
              <a
                href="https://x.com/lapzenstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#ff0000] hover:text-white transition-all duration-300">

                <Twitter size={16} fill="currentColor" strokeWidth={0} />
              </a>
            </div>

            {/* Utility Icons */}
            <div className="flex items-center gap-4 lg:gap-5">
              <Link href="/search" className="text-slate-900 hover:text-blue-700 transition-colors" aria-label="Search">
                <Search size={22} />
              </Link>
                <Link href="/cart" className="text-slate-900 hover:text-blue-700 transition-colors relative" aria-label="Shopping cart">
                  <ShoppingCart size={22} />
                  {mounted && itemCount > 0 &&
                <span className="absolute -top-2 -right-2 bg-[#ff0000] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                      {itemCount}
                    </span>
                }
                </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen &&
      <div className="fixed inset-0 z-[100] lg:hidden">
          <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)} />

          <div className="absolute top-0 left-0 w-[80%] max-w-[300px] h-full bg-white shadow-xl flex flex-col transition-transform duration-300">
            <div className="p-5 flex items-center justify-between border-b border-black/5">
              <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3703ae26-4d55-4c16-ad94-b7374ad76a02-lapzen-store/assets/svgs/347e75bb-ec5b-455b-be95-96a1d46d0742_096381d0-0717-1.svg"
              alt="Lapzen"
              width={88}
              height={32}
              className="w-[88px] h-auto mix-blend-multiply" />

              <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-900">

                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col py-6">
              <Link
              href="/"
              className="px-6 py-4 text-slate-900 text-[16px] font-medium border-b border-black/5 hover:bg-slate-50"
              onClick={() => setIsMobileMenuOpen(false)}>

                Home
              </Link>
                <Link
              href="/catalog"
              className="px-6 py-4 text-slate-900 text-[16px] font-medium border-b border-black/5 hover:bg-slate-50"
              onClick={() => setIsMobileMenuOpen(false)}>

                  Catalog
                </Link>
              <Link
              href="/collections"
              className="px-6 py-4 text-slate-900 text-[16px] font-medium border-b border-black/5 hover:bg-slate-50"
              onClick={() => setIsMobileMenuOpen(false)}>

                Collections
              </Link>
                  <Link
              href="/contact-us"
              className="px-6 py-4 text-slate-900 text-[16px] font-medium border-b border-black/5 hover:bg-slate-50"
              onClick={() => setIsMobileMenuOpen(false)}>

                    Contact
                  </Link>
                  <Link
              href="/about"
              className="px-6 py-4 text-slate-900 text-[16px] font-medium border-b border-black/5 hover:bg-slate-50"
              onClick={() => setIsMobileMenuOpen(false)}>

                    About
                  </Link>
                    <div className="px-6 py-4 mt-2">
                      <Link
                href="/admin"
                className="flex items-center justify-center gap-2 bg-navy text-white px-6 py-3 rounded-xl font-bold text-[15px] shadow-lg shadow-navy/20"
                onClick={() => setIsMobileMenuOpen(false)}>

                        Admin Panel
                      </Link>
                    </div>
                </nav>

            <div className="mt-auto p-6 flex items-center gap-6 border-t border-black/5">
              <a href="https://web.facebook.com/lap.lapzen" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600">
                <Facebook size={20} fill="currentColor" strokeWidth={0} />
              </a>
              <a href="https://www.instagram.com/lapzenstore" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-pink-600">
                <Instagram size={20} />
              </a>
              <a href="https://x.com/lapzenstore" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-black">
                <Twitter size={20} fill="currentColor" strokeWidth={0} />
              </a>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default Header;