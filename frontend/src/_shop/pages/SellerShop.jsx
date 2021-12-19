import React, { useState, useEffect } from "react";
import Header from "../components/sellerShopBase/Header";
import TabsController from "../components/sellerShopBase/TabsController";
import Voucher from "../components/sellerShopBase/Voucher";
import Content from "../components/sellerShopBase/Content";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Filter from "../components/sellerShopBase/Filter";
import FlashSale from "../components/sellerShopBase/FlashSale";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import config from "~/common/constants";
import Skeleton from "@mui/material/Skeleton";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2/dist/sweetalert2.js";
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
  const [follow, setfollow] = useState(false);
  const [menus, setmenus] = useState([]);
  const [flashSale, setflashSale] = useState();
  const [flashSaleItems, setflashSaleItems] = useState([]);
  const onFavourite = (id) => {
    setflashSaleItems((items) => {
      if (auth.isLoggedIn) {
        const target = items.find((e) => e.id == id);
        if (target.customer_wishlist.length > 0) {
          target.customer_wishlist.pop();
        } else {
          target.customer_wishlist = [
            { product_id: target.id, customer_id: auth.user.id },
          ];
        }
      } else {
        Swal.fire({
          title: "Please login to add a product to your wishlist!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      return [...items];
    });
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
        let userId = 0;
        if (auth.isLoggedIn) {
          console.log("login");
          userId = auth.user.id;
        }
        axios
          .get(
            `${config.SERVER_URL}/sellershop/follow/${id}?customer_id=${userId}`
          )
          .then(({ data }) => {
            setfollow(data.result);
          });

        axios
          .get(
            `${config.SERVER_URL}/sellershop/sections/${id}?customer_id=${userId}`
          )
          .then(({ data }) => {
            setsections(data.sections);
          });
        axios
          .post(`${config.SERVER_URL}/sellershop/${id}/shopdiscounts`, {
            customer_id: userId,
          })
          .then(({ data }) => {
            setcoupons(data.shopvouchers);
          });
        axios
          .get(
            `${config.SERVER_URL}/sellershop/${id}/flashsale?customer_id=${userId}`
          )
          .then(async ({ data }) => {
            console.log(data);
            await setflashSaleItems(data.flashsale.products_info);
            await setflashSale(data.flashsale);
          });
      })
      .then(() => {
        setloading(false);
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
              <Header shopInfo={shopInfo} follow={follow} />
            )}
          </Box>
          <Box
            sx={{
              width: "100vw",
              height: "2px",
              backgroundColor: "#D9DBE9",
            }}
          />
          {menus && (
            <Box className={classes.containerWhite}>
              <TabsController categories={menus} />
            </Box>
          )}
          {flashSale && (
            <FlashSale
              flashSale={flashSale}
              flashSaleItems={flashSaleItems}
              onFavourite={onFavourite}
            />
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
