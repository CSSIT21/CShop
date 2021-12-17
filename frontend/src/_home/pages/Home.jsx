import { useState } from "react";
import Popup from "../components/HomeBase/Popup";
import TopBanner from "../components/HomeBase/TopBanner";
import CategoriesSection from "../components/HomeBase/CategoriesSection";
import BestsellerSection from "../components/HomeBase/BestsellerSection";
import BottomBanner from "../components/HomeBase/BottomBanner";
import Footer from "../../common/components/Footer";
import SuggestionSection from "../components/HomeBase/SuggestionSection";
import fakeProducts from "~/common/faker/fakeProducts";
import PartnerSection from "../components/HomeBase/PartnerSection";
import AppReviewSection from "../components/HomeBase/AppReviewSection";

const HomePage = () => {
  const [products, setProducts] = useState(fakeProducts);

  const onFavourite = (index) => {
    setProducts((products) => {
      const target = products[index];
      target.favourite = !target.favourite;

      return [...products];
    });
  };

  return (
    <>
      <Popup />
      <TopBanner />
      <CategoriesSection  ca/>
      <BestsellerSection bestsellerItems={products} onFavourite={onFavourite} />
      <SuggestionSection suggestItems={products} onFavourite={onFavourite} />
      <BottomBanner />
      <AppReviewSection/>
      <PartnerSection />
      <Footer />
    </>
  );
};

export default HomePage;
