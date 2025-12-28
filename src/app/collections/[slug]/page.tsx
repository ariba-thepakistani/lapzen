import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { ProductsSection } from "@/components/sections/products-section";

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const brand = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pt-12">
        <div className="container mb-8">
          <h1 className="text-4xl font-bold text-navy uppercase tracking-tighter">
            {brand === "All" ? "All Products" : `${brand} Collection`}
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover our premium selection of {brand === "All" ? "high-performance laptops" : `${brand} devices`}.
          </p>
        </div>
        <ProductsSection brand={brand === "All" ? undefined : brand} />
      </main>
      <Footer />
    </div>
  );
}
