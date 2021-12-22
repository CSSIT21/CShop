import React, { useState, useEffect } from 'react'
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRecoilValue } from "recoil";
import authState from "../../common/store/authState";
import Axios from 'axios';
import config from "~/common/constants";


const useStyles = makeStyles({
  boxStyle: {
    width: "75%",
    border: "1px solid #ccc",
    paddingBottom: "5px",
  },
  boxDetail: {
    width: "100%",
    padding: "5px 20px 5px 20px",
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
  },
  boxHead: {
    width: "100%",
    padding: "10px 20px 10px 20px",
    justifyContent: "left",
    alignItems: "left",
    fontWeight: "bold",
    background: "#ccc",
    marginBottom: "5px",
  },
});

const OrderSummarize = ({ order_id }) => {
  const classes = useStyles();
  const auth = useRecoilValue(authState);
  // const [cusInfo, setCusInfo] = useState([])

  const [order, setOrder] = useState([]);
  const [customer, setCustomer] = useState([])
  const [addr, setAddr] = useState([])

  useEffect(() => {
    info()
  }, [])
  console.log(order_id);
  const orderId ={"orderId": order_id}
  const info = () => Axios.post( `${config.SERVER_URL}/payment/summary`,orderId).then((res) => {
            if (res.data.success) {
              
              setOrder(res.data.order)
              setCustomer(res.data.customer)
              setAddr(res.data.address)

              return "Done"
            } else {
              return "Fail"
            }
  }).catch((err) => console.log(err))


  
  // const customer = cusInfo.customer;
  // const addr = cusInfo.address;
  // const order = cusInfo.order;

  // const address =
  //   auth.user.addressLine +
  //   ", " +
  //   auth.user.subDistrict +
  //   ", " +
  //   auth.user.district +
  //   ", " +
  //   auth.user.province +
  //   " " +
  //   auth.user.postalCode;
  return (
    <Box
      // sx={{
      //   width: "45%",
      //   position: "static",
      //   float: 'right'
      // }}
    >
      <Box className={classes.boxStyle}>
        <Box className={classes.boxHead}>Order Summary</Box>
        <Box className={classes.boxDetail}>
          Order number<Typography>{ order_id.orderId }</Typography>
        </Box>
        <Box className={classes.boxDetail}>
          Purchaser<Typography>{customer.firstname}  { customer.lastname }</Typography>
        </Box>
        <Box className={classes.boxDetail}>
          Date <Typography> { order.order_date } </Typography>
        </Box>
      </Box>
      <Box className={classes.boxStyle}>
        <Box className={classes.boxHead}>Pickup</Box>
        <Box sx={{ width: "100%", padding: "5px 20px 5px 20px" }}>
          Delivery address : {addr.address_line} {addr.province} { addr.sub_districi } {addr.postal_code}
        </Box>
      </Box>
      <Box className={classes.boxStyle}>
        <Box className={classes.boxHead}>Payment details</Box>
        <Box className={classes.boxDetail}>
          Total cost<Typography>฿ {order.total_price}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderSummarize;