import Navbar from "../../components/general/navbar/Navbar";
import FeatureSection from "../../components/feature_section/FeatureSection";
import Footer from "../../components/general/footer/Footer";
import CategoriesSlider from "../../components/categories/CategoriesSlider";
import DealOfTheDays from "../../components/deal_of_the_days/DealOfTheDays";
import BestSellingSlider from "../../components/best_selling/BestSellingSlider";
import HeroTrendingProductSlider from "../../components/hero_trending_product_slider/HeroTrendingProductSlider";
import PromoSection from "../../components/promo_section/PromoSection";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="main-content container-fluid">
        <HeroTrendingProductSlider/>
        <CategoriesSlider/>
        {/* <DealOfTheDays/> */}
        <PromoSection/>
        <FeatureSection />
        <BestSellingSlider />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
