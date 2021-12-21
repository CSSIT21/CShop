import React from "react";
import { Box, Grid, Typography, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { For } from "~/common/utils";
import { useHistory } from "react-router-dom";

const OrderCard = ({ data }) => {
  const classes = useStyles();
  const router = useHistory();
  const getColor = () => {
    return (
      {
        Waiting: "#F4AF54",
        Success: "#B3E24B",
        Cancel: "#F25044",
      }[data?.status] || "primary"
    );
  };
  const getBackgroundColor = () => {
    return (
      {
        Waiting: "#F4AF5433",
        Success: "#B3E24B33",
        Cancel: "#F2504433",
      }[data?.status] || "primary"
    );
  };
  const getChipColor = () => {
    return (
      {
        Waiting: "#D28C40",
        Success: "#5B8125",
        Cancel: "#F25044",
      }[data?.status] || "primary"
    );
  };
  const orderDetail = () => {
    router.push(`/profile/history/order/${data.id}`);
  };
  return (
    <>
      <Box className={classes.card} onClick={orderDetail}>
        <Box
          sx={{
            width: "50px",
            backgroundColor: getColor(),
            margin: "0 30px 0 0",
            borderRadius: "18px 0px 0px 18px",
          }}
        ></Box>
        <Box className={classes.cardDetail}>
          <Grid container>
            <Grid item xs={7}>
              <Box sx={{ paddingTop: "20px" }}>
                <Box className={classes.orderTitle}>
                  <Typography
                    sx={{
                      fontSize: "21px",
                      fontWeight: "600",
                      marginRight: "20px",
                    }}
                  >
                    Order Number:
                  </Typography>
                  <Typography sx={{ fontSize: "21px", fontWeight: "500" }}>
                    {data?.id}
                  </Typography>
                </Box>
                <Box className={classes.orderTitle}>
                  <Chip
                    label={data?.status}
                    sx={{
                      backgroundColor: getBackgroundColor(),
                      color: getChipColor(),
                      fontSize: "14px",
                      marginRight: "15px",
                    }}
                  />
                  <Typography sx={{ fontSize: "14px", fontWeight: "300" }}>
                    {data?.id}
                  </Typography>
                </Box>
                <Box className={classes.orderTitle}>
                  <For each={data.order_item}>
                    {(item, idx) => (
                      <img
                        src={
                          item?.product_id_from_order_item.product_picture[0]
                            .path
                        }
                        alt=""
                        className={classes.pic}
                        width="84"
                        height="84"
                        key={idx}
                      />
                    )}
                  </For>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{
                  borderRight: "2px solid #D9DBE9",
                  height: "90%",
                  marginTop: "8%",
                }}
              ></Box>
            </Grid>

            <Grid
              item
              xs={3}
              sx={{
                marginLeft: "60px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid container>
                <Grid item xs={6} sx={textStyle}>
                  <Typography fontWeight={500}>Order Date</Typography>
                </Grid>
                <Grid item xs={6} sx={textStyle}>
                  <Typography>{data?.order_date.split("T")[0]}</Typography>
                </Grid>
                <Grid item xs={6} sx={textStyle}>
                  <Typography fontWeight={500}>Amount Due</Typography>
                </Grid>
                <Grid item xs={6} sx={textStyle}>
                  <Typography>{data?.total_price}฿</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
const useStyles = makeStyles({
  card: {
    backgroundColor: "white",
    borderRadius: "18px",
    marginBottom: "64px",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    cursor: "pointer",
  },
  orderTitle: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "20px",
  },
  cardDetail: {
    width: "100%",
  },
  pic: {
    marginRight: "10px",
    borderRadius: "10px",
  },
});
export default OrderCard;

const textStyle = { margin: "10px 0" };
