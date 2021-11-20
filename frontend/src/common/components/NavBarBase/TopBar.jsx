import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

const SellerTopBar = ({ isSeller = false }) => {
  const classes = useStyles();

  return (
    <Box className={classes.topBarWrapper}>
      <Box className={classes.topBarLeft}>
        <Box className={classes.sellerCenter}>
          <Link to={"/login"}>Seller Center</Link>
        </Box>

        {!isSeller && (
          <Box className={classes.sellerRegister}>
            <Link to={"/register/seller"}>Seller Register</Link>
          </Box>
        )}
      </Box>

      <Box className={classes.topBarRight}>
        <Link to={"/support"}>Support</Link>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  topBarWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: 'white',

    width: "100%",
    padding: "20px 40px 10px 40px",


    boxSizing: "border-box",
    fontSize: 12,

    "& a": {
      color: "#A0A3BD",
      transition: "all .07s ease-in-out",

      '&:hover': {
        color: "#5c5c5c",
      },
    },
  },

  topBarLeft: {
    display: "flex",
    width: "auto",
  },

  sellerCenter: {
    marginRight: 50,

    '&:active': {
      transform: "scale(0.9)",
    }
  },

  sellerRegister: {
    '&:active': {
      transform: "scale(0.9)",
    }
  },

  topBarRight: {
    display: "flex",
    width: "auto",
    justifyContent: "flex-end",

    '&:active': {
      transform: "scale(0.9)",
    }
  },

});

export default SellerTopBar;
