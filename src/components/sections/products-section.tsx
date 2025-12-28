"use client";

import React, { useState, useEffect } from "react";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export function ProductsSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const res = await fetch('/api/products?featured=true');
        const data = await res.json();
        if (res.ok) setProducts(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="bg-white">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-navy mb-2">Featured Laptops</h2>
            <p className="text-muted-foreground">Discover our best-selling premium laptops</p>
          </div>
          <Link 
            href="/catalog"
            className="hidden md:flex items-center gap-2 text-navy font-semibold hover:gap-3 transition-all"
          >
            View All
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-navy/20" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400">No featured products available yet.</p>
            <Link href="/admin/inventory" className="text-navy font-bold underline mt-2 inline-block">
              Add some in Admin Panel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Link 
          href="/catalog"
          className="md:hidden flex items-center justify-center gap-2 mt-8 text-navy font-semibold"
        >
          View All Products
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
