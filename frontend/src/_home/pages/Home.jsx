import TopBanner from "../components/HomeBase/TopBanner";
import CategoriesSection from "../components/HomeBase/CategoriesSection";
import BestsellerSection from "../components/HomeBase/BestsellerSection";
import BottomBanner from "../components/HomeBase/BottomBanner";
import Footer from "../../common/components/Footer";
import { useState } from "react";
import SuggestionSection from "../components/HomeBase/SuggestionSection";
import fakeProducts from "~/common/faker/fakeProducts";

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
      <TopBanner />
      <CategoriesSection />
      <BestsellerSection bestsellerItems={products} onFavourite={onFavourite} />
      <SuggestionSection suggestItems={products} onFavourite={onFavourite} />
      <BottomBanner />
      <Footer />
    </>
  );
};

export default HomePage;
