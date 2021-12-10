import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRecoilValue } from "recoil";
import authState from "../../common/store/authState";

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

const OrderSummarize = () => {
  const classes = useStyles();
  const auth = useRecoilValue(authState);
  const address =
    auth.user.addressLine +
    ", " +
    auth.user.subDistrict +
    ", " +
    auth.user.district +
    ", " +
    auth.user.province +
    " " +
    auth.user.postalCode;
  return (
    <Box
      sx={{
        width: "45%",
        position: "static",
        float: 'right'
      }}
    >
      <Box className={classes.boxStyle}>
        <Box className={classes.boxHead}>Order Summary</Box>
        <Box className={classes.boxDetail}>
          Order number<Typography>95565244</Typography>
        </Box>
        <Box className={classes.boxDetail}>
          Purchaser<Typography>{auth.user.first_name} {auth.user.last_name}</Typography>
        </Box>
        <Box className={classes.boxDetail}>
          Date<Typography>26/9/2018</Typography>
        </Box>
      </Box>
      <Box className={classes.boxStyle}>
        <Box className={classes.boxHead}>Pickup</Box>
        <Box sx={{ width: "100%", padding: "5px 20px 5px 20px" }}>
          Delivery address : {address} {auth.user.phoneNumber}
        </Box>
      </Box>
      <Box className={classes.boxStyle}>
        <Box className={classes.boxHead}>Payment details</Box>
        <Box className={classes.boxDetail}>
          Total cost<Typography>฿ 6960</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderSummarize;