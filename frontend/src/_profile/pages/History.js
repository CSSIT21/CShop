import React, { useEffect } from "react";
import TabsController from "../components/HistoryBase/TabsController";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import TopProfile from "../components/TopProfile";
import Search from "~/common/components/NavBarBase/Search";
import OrderPic1 from "../assets/order-1.png";
import OrderPic2 from "../assets/order-2.png";
import OrderPic3 from "../assets/order-3.png";
const orders = [
  {
    orderNumber: "1",
    address: "126 Pracha Uthit Rd, Bang Mot, Thung Khru, Bangkok 10140",
    pic: [OrderPic1, OrderPic2, OrderPic3],
    date: "October 22, 2021",
    amount: "1234567",
    status: "waiting",
  },
  {
    orderNumber: "2",
    address: "126 Pracha Uthit Rd, Bang Mot, Thung Khru, Bangkok 10140",
    pic: [OrderPic1, OrderPic2, OrderPic3],
    date: "March 21, 2021",
    amount: "73294394",
    status: "waiting",
  },
  {
    orderNumber: "3",
    address: "126 Pracha Uthit Rd, Bang Mot, Thung Khru, Bangkok 10140",
    pic: [OrderPic1, OrderPic2, OrderPic3],
    date: "October 28, 2021",
    amount: "34344",
    status: "waiting",
  },
];

const HistoryPage = () => {
  const classes = useStyles();
  useEffect(() => {
    document.body.style.backgroundColor = "#f3f4f5";
    return () => (document.body.style.backgroundColor = "white");
  }, []);
  return (
    <>
      <TopProfile />
      <Box className={classes.body}>
        <Box className={classes.container}>
          <Box className={classes.header}>
            <Box
              style={{
                margin: "26px 70px 0px 70px",
              }}
            >
              <Typography sx={{ fontSize: "32px", fontWeight: "600" }}>
                Order History
              </Typography>
              <Box sx={{ padding: "38px 0px 26px 0px" }}>
                <Search
                  showButton={false}
                  placeholder="Search for order number , product name"
                />
              </Box>
            </Box>
          </Box>
          <TabsController orders={orders} />
        </Box>
      </Box>
    </>
  );
};
const useStyles = makeStyles({
  body: {
    display: "flex",
    justifyContent: "center",
    padding: "72px 0px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
  },
  header: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "20px 20px 0px 0px",
  },
});

export default HistoryPage;
