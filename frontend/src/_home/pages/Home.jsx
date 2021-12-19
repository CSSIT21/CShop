import Popup from "../components/HomeBase/Popup";
import TopBanner from "../components/HomeBase/TopBanner";
import CategoriesSection from "../components/HomeBase/CategoriesSection";
import BestsellerSection from "../components/HomeBase/BestsellerSection";
import BottomBanner from "../components/HomeBase/BottomBanner";
import Footer from "../../common/components/Footer";
import SuggestionSection from "../components/HomeBase/SuggestionSection";
import PartnerSection from "../components/HomeBase/PartnerSection";
import AppReviewSection from "../components/HomeBase/AppReviewSection";

const HomePage = () => {
  return (
    <>
      <Popup />
      <TopBanner />
      <CategoriesSection />
      <BestsellerSection />
      <SuggestionSection />
      <BottomBanner />
      <AppReviewSection />
      <PartnerSection />
      <Footer />
    </>
  );
};

export default HomePage;
