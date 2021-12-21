import React, { useState, useLayoutEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ReviewDialog from "../../../_product/components/ReviewBase/ReviewDialog";
import config from "~/common/constants";
import axios from "axios";

const ProductDetail = ({ data, status, customerId }) => {
  const [reviewable, setreviewable] = useState(false);
  const [options, setOptions] = useState([]);
  const classes = useStyles();
  useLayoutEffect(() => {
    axios
      .post(`${config.SERVER_URL}/profile/order/detail/option`, {
        option_one: data.product_options[0],
        option_two: data.product_options[1],
      })
      .then(({ data }) => {
        setOptions(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(`${config.SERVER_URL}/profile/order/detail/checkreview`, {
        customer_id: customerId,
        product_id: data.product_id,
      })
      .then(({ data }) => {
        console.log(data);
        if (!data) {
          setreviewable(true);
        }
      });
  }, []);

  if (status === "Success") {
    return (
      <>
        <Grid item xs={1} sx={gridStyle}>
          <img
            src={data.product_id_from_order_item.product_picture[0].path}
            alt=""
            className={classes.pic}
            width="90"
            height="90"
          />
        </Grid>
        <Grid item xs={8} sx={gridStyle}>
          <Typography className={classes.shopName}>
            {data.product_id_from_order_item.title}
          </Typography>
          <Typography
            sx={{ color: "#949494", marginBottom: "10px" }}
            fontSize={"14px"}
          >
            {options[0]?.name}{" "}
            {options[1] && (
              <>
                {", "}
                {options[1].name}
              </>
            )}
          </Typography>
          <Typography>x{data.quantity}</Typography>
        </Grid>
        <Grid item xs={1} sx={gridStyle}>
          {data.product_id_from_order_item.price}฿
        </Grid>
        <Grid item xs={2} sx={gridStyle}>
          {reviewable ? (
            <ReviewDialog
              productImg={
                data.product_id_from_order_item.product_picture[0].path
              }
              productName={data.product_id_from_order_item.title}
              productId={data.product_id}
              shopId={data.product_id_from_order_item.shop_id}
              customerId={customerId}
              options={options}
              setreviewable={setreviewable}
            />
          ) : (
            <>
              <Button
                variant="outlined"
                sx={{
                  height: "40px",
                  width: "130px",
                  textTransform: "capitalize",
                  fontSize: "14px",
                }}
                disabled
              >
                Reviewed
              </Button>
            </>
          )}
        </Grid>
        <Grid item xs={14}>
          <Divider flexItem />
        </Grid>
      </>
    );
  }
  return (
    <>
      <Grid item xs={1} sx={gridStyle}>
        <img
          src={data.product_id_from_order_item.product_picture[0].path}
          alt=""
          className={classes.pic}
          width="80"
          height="80"
        />
      </Grid>
      <Grid item xs={10} sx={gridStyle}>
        <Typography
          className={classes.shopName}
          sx={{
            marginBottom: "10px",
          }}
        >
          {data.product_id_from_order_item.title}
        </Typography>
        <Typography>x1</Typography>
      </Grid>
      <Grid item xs={1} sx={gridStyle}>
        {data.product_id_from_order_item.price}฿
      </Grid>
      <Grid item xs={14}>
        <Divider flexItem />
      </Grid>
    </>
  );
};
const useStyles = makeStyles({
  pic: {
    borderRadius: "10px",
  },
  shopName: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2 /* number of lines to show */,
    WebkitBoxOrient: "vertical",
  },
});
const gridStyle = {
  margin: "20px",
};
export default ProductDetail;
