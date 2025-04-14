
import Hero3D from "@/components/Hero3D";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoSection from "@/components/PromoSection";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  return (
    <div>
      <Hero3D />
      <FeaturedCategories />
      <FeaturedProducts />
      <PromoSection />
      <Newsletter />
    </div>
  );
}
