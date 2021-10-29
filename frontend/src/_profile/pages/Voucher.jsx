import TopProfile from "../components/TopProfile";
import Coupon from "../components/VoucherBase/Coupon";
import React from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { For } from "~/common/utils";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button } from "@mui/material";

const coupons = [
  {
    title: "50% save for new user!!",
    detail: "This coupon can be use to have 50% discount",
    valid: "Until 31/12/2021",
  },
  {
    title: "50% save for new user!!",
    detail: "This coupon can be use to have 50% discount",
    valid: "Until 31/12/2021",
  },
  {
    title: "50% save for new user!!",
    detail: "This coupon can be use to have 50% discount",
    valid: "Until 31/12/2021",
  },
  {
    title: "50% save for new user!!",
    detail: "This coupon can be use to have 50% discount",
    valid: "Until 31/12/2021",
  },
  {
    title: "50% save for new user!!",
    detail: "This coupon can be use to have 50% discount",
    valid: "Until 31/12/2021",
  },
];
const VoucherPage = (props) => {
  const classes = useStyles();
  const [addCouponCode, setaddCouponCode] = useState("");
  return (
    <>
      <TopProfile />
      <Box className={classes.backgroud}>
        <Box className={classes.header}>Voucher & Coupon</Box>
        <Box className={classes.codeField}>
          <Box className={classes.textFieldBox} style={{ marginRight: "10px" }}>
            <TextField
              id="code"
              variant="outlined"
              placeholder="Add code here"
              fullWidth
              onChange={(e) => {
                setaddCouponCode(e.target.value);
              }}
            />
          </Box>
          <Button
            variant="contained"
            sx={{ height: "55px", width: "100px", textTransform: "capitalize" }}
          >
            Add
          </Button>
        </Box>
        <Box className={classes.couponCard}>
          <For each={coupons}>
            {(item, idx) => <Coupon key={idx} coupon={item} />}
          </For>
        </Box>
      </Box>
    </>
  );
};
const useStyles = makeStyles({
  backgroud: {
    backgroundColor: "#FDF4DD",
    width: "100%",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  couponCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "50px",
    margin: "60px",
  },
  codeField: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  textFieldBox: {
    marginBottom: "60px",
    backgroundColor: "white",
    borderRadius: "10px",
    width: "25%",
    [`& fieldset`]: {
      borderRadius: "10px",
    },
  },
});
export default VoucherPage;
