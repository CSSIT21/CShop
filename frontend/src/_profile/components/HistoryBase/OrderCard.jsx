import React from "react";
import { Box, Grid, Typography, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { For } from "~/common/utils";

const OrderCard = ({ data }) => {
  const classes = useStyles();
  const getColor = () => {
    return (
      {
        waiting: "#F4AF54",
        success: "#B3E24B",
        cancel: "#F25044",
      }[data.status] || "primary"
    );
  };
  const getBackgroundColor = () => {
    return (
      {
        waiting: "#F4AF5433",
        success: "#B3E24B33",
        cancel: "#F2504433",
      }[data.status] || "primary"
    );
  };
  const getChipColor = () => {
    return (
      {
        waiting: "#D28C40",
        success: "#5B8125",
        cancel: "#F25044",
      }[data.status] || "primary"
    );
  };

  return (
    <>
      <Box className={classes.card}>
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
                    {data.orderNumber}
                  </Typography>
                </Box>
                <Box className={classes.orderTitle}>
                  <Chip
                    label={data.status}
                    sx={{
                      backgroundColor: getBackgroundColor(),
                      color: getChipColor(),
                      fontSize: "14px",
                      marginRight: "15px",
                    }}
                  />
                  <Typography sx={{ fontSize: "14px", fontWeight: "300" }}>
                    {data.address}
                  </Typography>
                </Box>
                <Box className={classes.orderTitle}>
                  <For each={data.pic}>
                    {(item, idx) => (
                      <img
                        src={item}
                        alt={idx}
                        className={classes.pic}
                        width="84"
                        height="84"
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
                  <Typography>{data.date}</Typography>
                </Grid>
                <Grid item xs={6} sx={textStyle}>
                  <Typography fontWeight={500}>Amount Due</Typography>
                </Grid>
                <Grid item xs={6} sx={textStyle}>
                  <Typography>{data.amount} THB</Typography>
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
