import TopBanner from "../components/TopBanner";
import CategoriesSection from "../components/CategoriesSection";
import BestsellerSection from "../components/BestsellerSection";
import BottomBanner from "../components/BottomBanner";
import Footer from "../../common/components/Footer";
import { useState } from "react";
import SuggestionSection from "../components/SuggestionSection";

const Bestseller1 = "https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg";

const HomePage = () => {
  const itemsData = [
    {
      id: 0,
      title: "Cheese Pizza",
      price: "500",
      status: "Hot sale",
      favourite: true,
      image: Bestseller1,
    },
    {
      id: 1,
      title: "Cheese Pizza",
      price: "500",
      status: "Hot sale",
      favourite: false,
      image: Bestseller1,
    },
    {
      id: 2,
      title: "Cheese Pizza",
      price: "500",
      status: "Hot sale",
      favourite: false,
      image: Bestseller1,
    },
    {
      id: 3,
      title: "Cheese Pizza",
      price: "500",
      status: "Hot sale",
      favourite: false,
      image: Bestseller1,
    },
    {
      id: 4,
      title: "Cheese Pizza",
      price: "500",
      status: "Hot sale",
      favourite: true,
      image: Bestseller1,
    },
    {
      id: 5,
      title: "Cheese Pizza",
      price: "500",
      status: "Hot sale",
      favourite: true,
      image: Bestseller1,
    },
    {
      id: 6,
      title: "Cheese Pizza",
      price: "500",
      status: "Hot sale",
      favourite: false,
      image: Bestseller1,
    },
  ];
  const [items, setItems] = useState(itemsData);
  console.log(items);
  const onFavourite = (e, idx) => {
    e.preventDefault();
    setItems((items) => {
      items[idx].favourite = !items[idx].favourite;
      return [...items];
    });
  };

  return (
    <>
      <TopBanner />
      <CategoriesSection />
      <BestsellerSection bestsellerItems={items} onFavourite={onFavourite} />
      <SuggestionSection suggestItems={itemsData} onFavourite={onFavourite} />
      <BottomBanner />
      <Footer />
    </>
  );
};

export default HomePage;
