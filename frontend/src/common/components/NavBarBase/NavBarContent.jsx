import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import CShopLogo from "~/common/assets/images/Logo.svg";
import Search from "./ContentBase/Search";
import ActionMenu from "./ContentBase/ActionMenu";
import AccountDropdown from "./ContentBase/AccountDropdown";
import AuthenButton from "./ContentBase/AuthenButton";
import { useRecoilValue } from 'recoil';
import authState from '~/common/store/authState';

const NavbarContent = () => {
  const classes = useStyles();
  const { isLoggedIn } = useRecoilValue(authState);

  return (
    <Box className={classes.navbarWrapper}>
      <Box className={classes.navbarLeft} style={{ width: isLoggedIn ? "12%" : "12%" }}>
        <Link to="/home">
          <img width="150px" src={CShopLogo} alt="Logo" />
        </Link>
      </Box>

      <Box
        className={classes.navbarMiddle}
        style={{ width: isLoggedIn ? "65%" : "60%" }}
      >
        <Search />
      </Box>

      <Box
        className={classes.navbarRight}
        style={{ width: isLoggedIn ? "23%" : "28%" }}
      >
        <ActionMenu />
        {isLoggedIn ? <AccountDropdown /> : <AuthenButton />}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  navbarWrapper: {
    padding: '0px 20px 10px 20px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  navbarLeft: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  navbarMiddle: {
    // margin: '0 20px',
  },

  navbarRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default NavbarContent;
