import React, { useState, useEffect } from "react";
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
import FlashSale from "../components/sellerShopBase/FlashSale";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import config from "~/common/constants";
import Skeleton from "@mui/material/Skeleton";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";

const SellerShop = () => {
  const auth = useRecoilValue(authState);
  const history = useHistory();
  const classes = useStyles();
  const { id, cateId } = useParams();
  const [loading, setloading] = useState(true);
  const [coupons, setcoupons] = useState();
  const [shopInfo, setshopInfo] = useState();
  const [sections, setsections] = useState([]);
  const [menus, setmenus] = useState([]);
  const [flashSale, setflashSale] = useState();
  const onFavourite = (index) => {
    // setflashItems((flashItems) => {
    //   const target = flashItems[index];
    //   target.favourite = !target.favourite;
    //   return [...flashItems];
    // });
  };

  useEffect(() => {
    axios
      .get(`${config.SERVER_URL}/sellershop/${id}`)
      .then(({ data }) => {
        setshopInfo(data.shopinfo);
        setmenus(data.shopinfo.categories);
      })
      .catch((e) => {
        console.log(e.message);
        history.push("/*");
      })
      .then(() => {
        axios
          .get(`${config.SERVER_URL}/sellershop/sections/${id}`)
          .then(({ data }) => {
            setsections(data.sections);
          });
        axios
          .post(`${config.SERVER_URL}/sellershop/${id}/shopdiscounts`, {
            customer_id: auth.user.id,
          })
          .then(({ data }) => {
            setcoupons(data.shopvouchers);
          });
        axios
          .get(`${config.SERVER_URL}/sellershop/${id}/flashsale`)
          .then(({ data }) => {
            setflashSale(data.flashsale);
          })
          .then(() => {
            setloading(false);
          });
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
            {loading ? (
              <Skeleton animation="wave" width="100%" height="200px" />
            ) : (
              <Header shopInfo={shopInfo} />
            )}
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
          {coupons && (
            <Box className={classes.containerWhite}>
              <Voucher shopcoupons={coupons} />
            </Box>
          )}
          <Box className={classes.categoryBox}>
            <Box className={classes.category}>
              {loading ? (
                <Skeleton animation="wave" width="100%" height="400px" />
              ) : (
                sections.map((section, idx) => {
                  return <Content key={section.id} section={section} />;
                })
              )}
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
