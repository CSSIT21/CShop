import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useLayoutEffect, useEffect, useState } from "react";
import TopProfile from "../components/TopProfile";
import { makeStyles } from "@mui/styles";
import DeliveryProgress from "../components/HistoryBase/DeliverlyProgress";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Grid from "@mui/material/Grid";
import ProductDetail from "../components/HistoryBase/ProductDetail";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import authState from "../../common/store/authState";
import config from "~/common/constants";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import ProductDetailHeader from "../components/HistoryBase/ProductDetailHeader";

const OrderDetail = () => {
  const classes = useStyles();
  const orderId = useParams();
  const auth = useRecoilValue(authState);
  const [reviewable, setreviewable] = useState(true);
  const [onLoad, setonLoad] = useState(false);
  const [orderDetail, setorderDetail] = useState({});
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setonLoad(true);
    axios
      .post(`${config.SERVER_URL}/profile/order/detail`, {
        customer_id: auth.user.id,
        order_id: parseInt(orderId.id),
      })
      .then(({ data }) => {
        setorderDetail(data);
        setProducts(data.order_item);
        setonLoad(false);
      });
  }, []);
  useLayoutEffect(() => {
    document.body.classList.add("gray");
    return () => document.body.classList.remove("gray");
  }, []);
  return (
    <>
      <TopProfile />
      <Box className={classes.container}>
        <Box className={classes.body}>
          <Box sx={{ width: "90%", marginBottom: "50px" }}>
            <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
              Order Number: {orderDetail.id}
            </Typography>
          </Box>
          <Box sx={{ width: "90%", marginBottom: "40px" }}>
            <DeliveryProgress status={orderDetail.status} />
          </Box>
          <Box
            sx={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "60px",
            }}
          >
            <Box>
              <Typography fontSize={"24px"} sx={{ marginBottom: "25px" }}>
                Delivery Address
              </Typography>
              <Typography
                fontSize={"18px"}
                fontWeight={"300"}
                sx={{ marginBottom: "10px" }}
              >
                Jirasin Jarethammajit
              </Typography>
              <Box sx={{ color: "#949494" }}>
                <Typography
                  fontSize={"14px"}
                  fontWeight={"300"}
                  sx={{ marginBottom: "2px" }}
                >
                  0951146614
                </Typography>
                <Typography fontSize={"14px"} fontWeight={"300"}>
                  This is my home, Talat Noi, Samphanthawong, Bangkok, 10100
                </Typography>
              </Box>
            </Box>
            <Box className={classes.buttonGroup}>
              {orderDetail.status === "Success" && (
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  startIcon={<ShoppingCartRoundedIcon />}
                  onClick={() => setOpen(true)}
                >
                  Buy Again
                </Button>
              )}

              <Button
                variant="outlined"
                sx={buttonStyle}
                startIcon={<ChatRoundedIcon />}
              >
                Contact Seller
              </Button>
            </Box>
          </Box>
          <Grid container columns={14} width={"90%"}>
            <ProductDetailHeader status={orderDetail.status} />
            <Grid item xs={14}>
              <Divider />
            </Grid>
            {products.map((product, idx) => (
              <ProductDetail
                key={idx}
                data={product}
                status={orderDetail.status}
                customerId={auth.user.id}
              />
            ))}
          </Grid>
        </Box>
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
    </>
  );
};
const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  body: {
    backgroundColor: "white",
    width: "90%",
    margin: "40px 0px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 0px",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
  },
});
const buttonStyle = {
  height: "50px",
  width: "200px",
  textTransform: "capitalize",
  fontSize: "14px",
  marginBottom: "20px",
};

export default OrderDetail;
