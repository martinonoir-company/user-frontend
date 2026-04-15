import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedCategories />
        <FeaturedProducts />
        <TrustSection />
      </main>
      <Footer />
    </>
  );
}
