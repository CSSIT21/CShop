import React, { useState, useLayoutEffect, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CouponPic from "~/common/assets/images/voucher-pic.png";
import LoadingButton from "@mui/lab/LoadingButton";
import BorderLinearProgress from "~/common/components/BorderLinearProgress";
import { noop } from "~/common/utils";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Coupon = ({ coupon, onClick = noop, loading }) => {
  const classes = useStyles();
  const [date, setdate] = useState();

  useEffect(() => {
    setdate(dayjs(coupon.discount_id_from_discount_shop.end_date).fromNow());
  }, []);

  return (
    <Box className={classes.couponbox}>
      <img
        src={CouponPic}
        src={
          coupon.discount_id_from_discount_shop.picture_path
            ? coupon.discount_id_from_discount_shop.picture_path
            : CouponPic
        }
        width="150px"
        alt="coupon picture"
      />

      <Box className={classes.text}>
        <Typography sx={titleStyle}>
          {coupon.discount_id_from_discount_shop.code}{" "}
        </Typography>
        <BorderLinearProgress
          variant="determinate"
          value={Math.ceil(100 * (coupon.quantity / coupon.max_quantity))}
          sx={{ margin: "10px 0" }}
        />
        <Typography sx={remainStyle}>
          Remaining Voucher: {coupon.quantity}
        </Typography>
        <Typography sx={expireStyle}>Expiring: {date}</Typography>
      </Box>

      <Divider orientation="vertical" flexItem />
      <Box sx={{ marginLeft: "30px" }}>
        <LoadingButton loading={loading} onClick={onClick} variant="contained">
          Claim
        </LoadingButton>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  couponbox: {
    margin: "0px auto",
    width: "100%",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "15px",
    backgroundColor: "#FFFFFF",
  },

  text: {
    padding: "0 20px",
  },
});

const titleStyle = {
  fontSize: "20px",
  fontWeight: 600,
  color: "#FD6637",
};

const remainStyle = {
  fontSize: "12px",
  fontWeight: 500,
};

const expireStyle = {
  fontSize: "12px",
  fontWeight: 500,
  color: "#FD6637",
};

export default Coupon;
