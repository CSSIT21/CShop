import React, { useState, useEffect } from "react";
import Header from "../components/sellerShopBase/Header";
import TabsController from "../components/sellerShopBase/TabsController";
import Voucher from "../components/sellerShopBase/Voucher";
import Content from "../components/sellerShopBase/Content";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import fakeProducts from "~/common/faker/fakeProducts";
import Filter from "../components/sellerShopBase/Filter";
import FlashSale from "../components/sellerShopBase/FlashSale";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import config from "~/common/constants";

const flashSaleData = { products: fakeProducts, endAt: 1636916867 };

const SellerShop = () => {
  const history = useHistory();
  const classes = useStyles();
  const { id, cateId } = useParams();
  const [coupons, setcoupons] = useState();
  const [shopInfo, setshopInfo] = useState();
  const [sections, setsections] = useState([]);
  const [products, setproducts] = useState();
  const [menus, setmenus] = useState([]);
  const [flashSale, setflashSale] = useState(flashSaleData);
  const onFavourite = (index) => {
    setflashItems((flashItems) => {
      const target = flashItems[index];
      target.favourite = !target.favourite;
      return [...flashItems];
    });
  };
  useEffect(async () => {
    await axios
      .get(`${config.SERVER_URL}:8080/sellershop/${id}`)
      .then(({ data }) => {
        setshopInfo(data.shopinfo);
        setmenus(data.shopinfo.categories);
      })
      .catch((e) => {
        console.log(e.message);
        history.push("/*");
      });
    axios
      .get(`${config.SERVER_URL}/sellershop/${id}/products`)
      .then(({ data }) => {
        setproducts(data.products);
      });
    axios
      .get(`${config.SERVER_URL}/sellershop/${id}/sections`)
      .then(({ data }) => {
        setsections(data.sections);
      });
    axios
      .get(`${config.SERVER_URL}/sellershop/${id}/shopdiscounts`)
      .then(({ data }) => {
        setcoupons(data.shopvouchers);
      });
  }, []);
  return (
    <>
      <Box className={classes.body}>
        <Box className={classes.container}>
          <Box
            sx={{
              width: "80vw",
              marginBottom: "30px",
              padding: "25px 75px",
            }}
          >
            <Header shopInfo={shopInfo} />
          </Box>
          <Box
            sx={{
              width: "100vw",
              height: "2px",
              backgroundColor: "#D9DBE9",
            }}
          />
          <Box className={classes.containerWhite}>
            <TabsController categories={menus} />
          </Box>
          {flashSale && (
            <FlashSale flashSale={flashSale} onFavourite={onFavourite} />
          )}
          {coupons > 0 && (
            <Box className={classes.containerWhite}>
              <Voucher shopcoupons={coupons} />
            </Box>
          )}
          <Box className={classes.categoryBox}>
            <Box className={classes.category}>
              {sections.map((section, idx) => {
                return <Content key={section.id} section={section} />;
              })}
            </Box>
          </Box>
          <Box className={classes.containerWhite}>
            <Filter categories={menus} products={products} />
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
