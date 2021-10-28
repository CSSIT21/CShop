import TopProfile from "../components/TopProfile";
import Coupon from "../components/VoucherBase/Coupon";
import React from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { For } from "~/common/utils";

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

  return (
    <>
      <TopProfile />
      <Box></Box>
      <Box className={classes.backgroud}>
        <Box className={classes.header}>Voucher & Coupon</Box>
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
  },
  couponCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "50px",
    margin: "60px",
  },
});
export default VoucherPage;
