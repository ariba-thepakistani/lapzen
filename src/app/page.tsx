import Header from "@/components/sections/header";
import HeroBanner from "@/components/sections/hero-banner";
import BrandGrid from "@/components/sections/brand-grid";
import CategoryGrid from "@/components/sections/category-grid";
import PopularSeriesSection from "@/components/sections/popular-series-grid";
import BrandStory from "@/components/sections/brand-story";
import FAQAccordion from "@/components/sections/faq-accordion";
import Footer from "@/components/sections/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ProductsSection } from "@/components/sections/products-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col selection:bg-navy/10">
      <Header />
      
      <main className="flex-grow relative">
        <HeroBanner />
        
        <div className="relative">
          <div className="section-connector top-0" />
          <ScrollReveal>
            <BrandGrid />
          </ScrollReveal>
        </div>

        <div className="relative">
          <div className="section-connector top-0 opacity-50" />
          <ScrollReveal delay={0.1}>
            <ProductsSection />
          </ScrollReveal>
        </div>

        <div className="relative">
          <div className="section-connector top-0 opacity-50" />
          <ScrollReveal delay={0.1}>
            <CategoryGrid />
          </ScrollReveal>
        </div>

        <div className="relative">
          <div className="section-connector top-0" />
          <ScrollReveal>
            <PopularSeriesSection />
          </ScrollReveal>
        </div>

        <div className="relative overflow-hidden">
          <div className="grid-overlay absolute inset-0 pointer-events-none opacity-40" />
          <ScrollReveal direction="up">
            <BrandStory />
          </ScrollReveal>
        </div>

        <div className="relative">
          <div className="section-connector top-0 opacity-30" />
          <ScrollReveal>
            <FAQAccordion />
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
