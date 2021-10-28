import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import CShopLogo from "../../assets/images/Logo.svg";
import Search from "./Search";
import ActionMenu from "./ActionMenu";
import AccountDropdown from "./AccountDropdown";
import AuthenButton from "./AuthenButton";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  navbarWrapper: {
    padding: "0px 50px 10px 50px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },

  navbarMiddle: {
    padding: "0 20px",
    margin: 20,
  },

  navbarRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },

  logo: {
    width: "150px",
  },
});

const NavbarContent = ({ isLogin }) => {
  const classes = useStyles();

  return (
    <Box className={classes.navbarWrapper}>
      <Box style={{ width: isLogin ? "10%" : "12%" }}>
        <Link to="/home">
          <img className={classes.logo} src={CShopLogo} alt="Logo" />
        </Link>
      </Box>

      <Box
        className={classes.navbarMiddle}
        style={{ width: isLogin ? "70%" : "60%" }}
      >
        <Search />
      </Box>

      <Box
        className={classes.navbarRight}
        style={{ width: isLogin ? "20%" : "28%" }}
      >
        <ActionMenu />
        {isLogin ? <AccountDropdown /> : <AuthenButton />}
      </Box>
    </Box>
  );
};

export default NavbarContent;
