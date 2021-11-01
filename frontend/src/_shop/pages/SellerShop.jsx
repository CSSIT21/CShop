import React from "react";
import Header from "../components/sellerShopBase/Header";
import TabsController from "../components/sellerShopBase/TabsController";
import Voucher from "../components/sellerShopBase/Voucher";
import Content from "../components/sellerShopBase/Content";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import CategoryPic1 from "~/common/assets/images/category-1.png";
import CategoryPic2 from "~/common/assets/images/category-2.png";
import BannerImage from "~/_home/assets/images/TopBanner.png";
import fakeProducts from "~/common/faker/fakeProducts";
import Filter from "../components/sellerShopBase/Filter";

const sections = [
  {
    id: "4",
    page: {
      type: 3,
      id: "4",
      filter: "Computer",
      content: fakeProducts,
    },
  },
  {
    id: "1",
    page: {
      type: 1,
      id: "1",
      content: { img: CategoryPic1 },
    },
  },
  {
    id: "2",
    page: {
      type: 1,
      id: "2",
      content: { img: CategoryPic2 },
    },
  },
  {
    id: "4",
    page: {
      type: 3,
      id: "4",
      filter: "Refrigerator",
      content: fakeProducts,
    },
  },
  {
    id: "3",
    page: {
      type: 2,
      id: "3",
      content: [
        {
          id: 0,
          url: BannerImage,
        },
        {
          id: 1,
          url: BannerImage,
        },
        {
          id: 2,
          url: BannerImage,
        },
      ],
    },
  },
  
  {
    id: "4",
    page: {
      type: 3,
      id: "4",
      filter: "TV & Entertainments",
      content: fakeProducts,
    },
  },
  
];

const menus = [
  {
    cateId: 3,
    title: "Games",
  },
  {
    cateId: 4,
    title: "PC",
  },
  {
    cateId: 5,
    title: "Fan",
  },
  {
    cateId: 6,
    title: "Umbar",
  },
]

const SellerShop = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.body}>
        <Box className={classes.container}>
          <Box className={classes.containerWhite}>
            <Box sx={{ marginBottom: "30px", padding: "50px 100px" }}>
              <Header />
            </Box>
            <TabsController categories={menus} />
            <Voucher />
          </Box>
          <Box className={classes.categoryBox}>
            <Box className={classes.category}>
              {sections.map((section, idx) => {
                return <Content key={idx} section={section} />;
              })}
            </Box>
          </Box>
          <Box className={classes.containerWhite}>
              <Filter categories={menus} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

const useStyles = makeStyles({
  body: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "20px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  containerWhite: {
    width: "86%",
  },
  categoryBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#EFEFF1",
  },
  category: {
    width: "86%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "80px 0px",
  },
});
export default SellerShop;
