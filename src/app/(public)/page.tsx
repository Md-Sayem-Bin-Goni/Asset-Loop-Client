import BannerSection from "@/components/home/BannerSection";
import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import CategoriesSection from "@/components/home/CategoriesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CustomerReviews from "@/components/home/CustomerReviews";
import ExtraSections from "@/components/home/ExtraSections";

export default function HomePage() {
  return (
    <div>
      <BannerSection />
      <FeaturedEquipment />
      <CategoriesSection />
      <WhyChooseUs />
      <CustomerReviews />
      <ExtraSections />
    </div>
  );
}