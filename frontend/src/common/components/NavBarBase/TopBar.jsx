import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

const useStyles = makeStyles({
  topBarWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",
    padding: "20px 50px 0 50px",
    marginBottom: "15px",

    boxSizing: "border-box",
    fontSize: 12,

    "& a": {
      color: "#A0A3BD",
    },
  },

  topBarLeft: {
    display: "flex",
    width: "auto",
  },

  topBarRight: {
    display: "flex",
    width: "auto",
    justifyContent: "flex-end",
  },

  sellerCenter: {
    marginRight: 50,
  },
});

const SellerTopBar = ({ isSeller = false }) => {
  const classes = useStyles();

  return (
    <Box className={classes.topBarWrapper}>
      <Box className={classes.topBarLeft}>
        <Box className={classes.sellerCenter}>
          <Link to={"/login"}>Seller Center</Link>
        </Box>

        {!isSeller && (
          <Box>
            <Link to={"/login"}>Seller Register</Link>
          </Box>
        )}
      </Box>

      <Box className={classes.topBarRight}>
        <Link to={"/support"}>Support</Link>
      </Box>
    </Box>
  );
};

export default SellerTopBar;
