"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { LayoutGrid, Landmark, Laptop2, Tag, ChevronRight } from "lucide-react";

export default function CollectionsPage() {
  const [collections, setCollections] = useState({
    brands: [] as string[],
    categories: [] as string[],
    series: [] as string[],
  });

  useEffect(() => {
    async function fetchCollections() {
      const { data } = await supabase.from('products').select('brand, category, series');
      if (data) {
        const brands = Array.from(new Set(data.map(i => i.brand).filter(Boolean)));
        const categories = Array.from(new Set(data.map(i => i.category).filter(Boolean)));
        const series = Array.from(new Set(data.map(i => i.series).filter(Boolean)));
        setCollections({ brands, categories, series });
      }
    }
    fetchCollections();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-navy mb-4 tracking-tight">OUR <span className="text-navy/20">COLLECTIONS</span></h1>
            <p className="text-slate-500 max-w-xl mx-auto">Browse our laptops by brand, category, or series to find exactly what you're looking for.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <CollectionSection 
              title="Shop by Brand" 
              items={collections.brands} 
              icon={<Landmark className="w-5 h-5" />} 
              path="brand"
            />
            <CollectionSection 
              title="Shop by Category" 
              items={collections.categories} 
              icon={<LayoutGrid className="w-5 h-5" />} 
              path="category"
            />
            <CollectionSection 
              title="Shop by Series" 
              items={collections.series} 
              icon={<Laptop2 className="w-5 h-5" />} 
              path="series"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function CollectionSection({ title, items, icon, path }: { title: string; items: string[]; icon: React.ReactNode; path: string }) {
  if (items.length === 0) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-navy">{title}</h2>
      </div>
      
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col gap-2">
        {items.map((item) => (
          <Link 
            key={item}
            href={`/catalog?${path}=${encodeURIComponent(item)}`}
            className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 group transition-all"
          >
            <span className="font-bold text-navy group-hover:pl-2 transition-all">{item}</span>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-navy group-hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
