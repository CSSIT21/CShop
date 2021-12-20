import React, { useState, useEffect, useLayoutEffect } from "react";
import TabsController from "../components/HistoryBase/TabsController";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import TopProfile from "../components/TopProfile";
import Search from "~/common/components/NavbarBase/ContentBase/Search";
import axios from "axios";
import { useRecoilValue } from "recoil";
import authState from "../../common/store/authState";
import config from "~/common/constants";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";

const HistoryPage = () => {
  const classes = useStyles();
  const auth = useRecoilValue(authState);
  const [orders, setOrders] = useState([]);
  const [onLoad, setonLoad] = useState(false);

  useEffect(() => {
    setonLoad(true);
    axios
      .post(`${config.SERVER_URL}/profile/order`, {
        customer_id: auth.user.id,
      })
      .then(({ data }) => {
        for (var i = 0; i < data.length; i++) {
          if (
            data[i].status === "Received_a_request" ||
            data[i].status === "Received_a_package" ||
            data[i].status === "Delivering"
          ) {
            data[i].status = "Waiting";
          }
        }
        return data;
      })
      .then((data) => {
        setOrders(data);
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
