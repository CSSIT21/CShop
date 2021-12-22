import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import config from '../../common/constants';
import ProductSuggestion from "../components/SuggestionSection";
import fakeProducts from "~/common/faker/fakeProducts";
import CartSection from "../components/CartSection";
import axios from "axios";
import authState from "../../common/store/authState";
import { useRecoilValue } from "recoil";
import Dialog from "@mui/material/Dialog";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function ShoppingCartPage() {
  const [products, setProducts] = useState([]);
  const [sugproduct, setSugproduct] = useState(fakeProducts);
  const [discounts, setDiscounts] = useState([]);
  const [accountInfo, setAccountInfo] = useState([]);
  const [onLoad, setonLoad] = useState(false);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    setonLoad(true);
    axios.get(`${config.SERVER_URL}/cart/${auth.user.id}`).then((item) => {
      setProducts(
        item.data.newD.map((item) => {
          return {
            ...{
              orderID: item.id,
              ...item.productName,
              image: item.productName.product_picture[0].path || "",
              amount: item.quantity,
            },
          };
        })
      );
      setDiscounts(
        item.data.customerDiscount.map((item) => {
          const discount = item.discount_id_from_iscount_user_code;
          return {
            id: item.id,
            title: discount.description,
            remaining: 1,
            valid: new Date(discount.end_date).toDateString(),
            claimed: false,
            type: discount.discount_types,
            limit: 1000,
            min: discount.min_price,
            value: discount.reduce_price / 100,
            img: discount.picture_path,
          };
        })
      );
      setAccountInfo([...item.data.customerDetail]);
      setonLoad(false);
    });
  }, []);

  const onFavourite = (index) => {
    setSugproduct(
      sugproduct.map((item, ind) => {
        if (index === item.id) {
          return { ...item, favourite: !item.favourite };
        }
        return item;
      })
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          backgroundColor: "#F3F4F5",
        }}
      >
        <CartSection
          allProduct={products}
          setProduct={setProducts}
          discounts={discounts}
          accountInfo={accountInfo}
        />
      </Box>
      <Box sx={{ width: "88%" }}>
        <ProductSuggestion
          suggestionItems={sugproduct}
          onFavourite={onFavourite}
        />
      </Box>
      <Dialog open={onLoad} aria-describedby="alert-dialog-slide-description">
        <Box
          sx={{
            height: "250px",
            width: "500px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress size={70} sx={{ marginTop: "1rem" }} />
          <Typography
            fontWeight="600"
            fontSize="20px"
            color="#FD6637"
            sx={{ padding: "0 2rem", marginTop: "50px" }}
          >
            Loading
          </Typography>
        </Box>
      </Dialog>
    </Box>
  );
}

export default ShoppingCartPage;
