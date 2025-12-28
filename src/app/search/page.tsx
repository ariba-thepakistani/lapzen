import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, ShoppingBag } from "lucide-react";
import { ProductsSection } from "@/components/sections/products-section";
import { useState } from "react";

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pt-12">
        <div className="container mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-navy uppercase tracking-tighter mb-8">
              Search Results
            </h1>
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search for laptops, brands, or series..." 
                className="h-14 pl-12 text-lg rounded-xl border-navy/10 focus:border-navy"
                autoFocus
              />
            </div>
          </div>
        </div>
        
        <div className="container pb-20">
          <div className="flex items-center gap-2 mb-8 text-muted-foreground">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-widest">Showing all products</span>
          </div>
          <ProductsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
