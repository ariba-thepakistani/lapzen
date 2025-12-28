"use client";

import React, { useState, useEffect, Suspense } from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { ProductCard } from "@/components/product-card";
import { Search, Filter, SlidersHorizontal, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = searchParams.get("category");
  const activeBrand = searchParams.get("brand");
  const activeSeries = searchParams.get("series");
  const activeRam = searchParams.get("ram");
  const activeStorage = searchParams.get("storage");

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, activeBrand, activeSeries]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory) params.set("category", activeCategory);
      if (activeBrand) params.set("brand", activeBrand);
      if (activeSeries) params.set("series", activeSeries);
      
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      if (res.ok) setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  const clearFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`/catalog?${params.toString()}`);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRam = !activeRam || 
      p.ram_size?.toLowerCase().includes(activeRam.toLowerCase()) || 
      p.specs?.ram?.toLowerCase().includes(activeRam.toLowerCase());
    const matchesStorage = !activeStorage || 
      p.storage_size?.toLowerCase().includes(activeStorage.toLowerCase()) ||
      p.specs?.storage?.toLowerCase().includes(activeStorage.toLowerCase());
    
    return matchesSearch && matchesRam && matchesStorage;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 tracking-tight">
                LAPTOP <span className="text-navy/40">CATALOG</span>
              </h1>
              <div className="flex flex-wrap gap-2">
                {activeCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-navy text-white text-xs font-bold">
                    {activeCategory}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('category')} />
                  </span>
                )}
                {activeBrand && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold">
                    {activeBrand}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('brand')} />
                  </span>
                )}
                {activeSeries && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800 text-white text-xs font-bold">
                    {activeSeries}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('series')} />
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-grow md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search laptops..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "p-3 rounded-2xl border transition-all",
                  showFilters ? "bg-navy text-white border-navy" : "bg-white text-navy border-gray-100 hover:bg-gray-50"
                )}
              >
                <SlidersHorizontal className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {showFilters && (
              <aside className="lg:col-span-1 space-y-8 animate-in fade-in slide-in-from-left duration-300">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                  <div>
                    <h3 className="text-sm font-black text-navy uppercase tracking-widest mb-4">RAM Size</h3>
                    <div className="space-y-2">
                      {['8GB', '16GB', '32GB', '64GB'].map((ram) => (
                        <label key={ram} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 rounded-lg border-gray-200 text-navy focus:ring-navy"
                            checked={activeRam === ram}
                            onChange={() => {
                              const params = new URLSearchParams(searchParams.toString());
                              if (activeRam === ram) params.delete('ram');
                              else params.set('ram', ram);
                              router.push(`/catalog?${params.toString()}`);
                            }}
                          />
                          <span className="text-sm font-medium text-gray-600 group-hover:text-navy transition-colors">{ram}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-navy uppercase tracking-widest mb-4">Storage</h3>
                    <div className="space-y-2">
                      {['256GB', '512GB', '1TB', '2TB'].map((storage) => (
                        <label key={storage} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 rounded-lg border-gray-200 text-navy focus:ring-navy"
                            checked={activeStorage === storage}
                            onChange={() => {
                              const params = new URLSearchParams(searchParams.toString());
                              if (activeStorage === storage) params.delete('storage');
                              else params.set('storage', storage);
                              router.push(`/catalog?${params.toString()}`);
                            }}
                          />
                          <span className="text-sm font-medium text-gray-600 group-hover:text-navy transition-colors">{storage}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            )}

            <div className={cn(
              "grid gap-6 transition-all duration-300",
              showFilters ? "lg:col-span-3 grid-cols-1 md:grid-cols-2" : "lg:col-span-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            )}>
              {loading ? (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400">
                  <Loader2 className="w-10 h-10 animate-spin mb-4 text-navy/20" />
                  <p className="font-medium">Updating catalog...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="col-span-full py-20 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
                  <p className="text-gray-400 font-medium">No laptops found matching your criteria.</p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
      <CatalogContent />
    </Suspense>
  );
}
