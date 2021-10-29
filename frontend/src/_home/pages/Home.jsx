import TopBanner from "../components/TopBanner";
import CategoriesSection from "../components/CategoriesSection";
import BestsellerSection from "../components/BestsellerSection";
import BottomBanner from "../components/BottomBanner";
import Footer from "../../common/components/Footer";
import { useState } from "react";
import SuggestionSection from "../components/SuggestionSection";
import fakeProducts from "~/common/faker/fakeProducts";

const HomePage = () => {
  console.log(fakeProducts);
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
