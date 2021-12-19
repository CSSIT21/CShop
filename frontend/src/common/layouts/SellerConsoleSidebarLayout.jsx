import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import Logo from "../assets/images/Logo.svg";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import AllInboxRoundedIcon from "@mui/icons-material/AllInboxRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import LoyaltyRoundedIcon from "@mui/icons-material/LoyaltyRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import { Link, useParams, useLocation } from "react-router-dom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useMiddleware } from "../hooks";

const drawerWidth = 280;

const generateLink = (Icon, title = "", path = "/") => ({ Icon, title, path });

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  "& ::-webkit-scrollbar": {
    width: "12px",
  },
  "& ::-webkit-scrollbar-thumb": {
    background: "#cecece",
    borderRadius: "5px",
  },
  "& ::-webkit-scrollbar-thumb:hover": {
    background: "#c5c5c5",
  },

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SellerConsoleSidebarLayout(props) {
  const classes = useStyles();
  const params = useParams();
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;
  useMiddleware();

  let links = [
    generateLink(
      EventRoundedIcon,
      "Dashboard",
      "/seller/" + params.id + "/dashboard"
    ),
    generateLink(
      AllInboxRoundedIcon,
      "Stock",
      "/seller/" + params.id + "/stock"
    ),
    generateLink(
      BoltRoundedIcon,
      "FlashSale",
      "/seller/" + params.id + "/flashsell"
    ),
    generateLink(
      BuildRoundedIcon,
      "Page customization",
      "/seller/" + params.id + "/customize"
    ),
    generateLink(
      ShoppingBasketRoundedIcon,
      "FlashSale Log",
      "/seller/" + params.id + "/flashsalelog"
    ),
    generateLink(
      ShowChartRoundedIcon,
      "Stock Log",
      "/seller/" + params.id + "/stocklog"
    ),
    generateLink(
      FormatListBulletedRoundedIcon,
      "Order Status",
      "/seller/" + params.id + "/orderstatus"
    ),
    generateLink(
      ReceiptRoundedIcon,
      "Order History",
      "/seller/" + params.id + "/orderlog"
    ),
    // generateLink(
    //   LocalOfferIcon,
    //   "Add Coupon",
    //   "/seller/" + params.id + "/coupon"
    // ),
    generateLink(
      LoyaltyRoundedIcon,
      "Coupon",
      "/seller/" + params.id + "/discountlog"
    ),
    generateLink(
      AttachMoneyRoundedIcon,
      "Refund History",
      "/seller/" + params.id + "/refundlog"
    ),
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={true}>
        <Link className={classes.logo} to="/home">
          <img src={Logo} alt="logo" width="140px" />
        </Link>
        <List>
          {links.map(({ Icon, title, path }, index) => (
            <ListItem
              button
              key={index}
              to={path}
              component={Link}
              sx={{
                ...listStyle,
                ...(pathname == path
                  ? {
                      backgroundColor: "#FD6637",
                      "& span": {
                        color: "#ffffff",
                      },

                      "& svg": {
                        color: "#ffffff",
                      },
                    }
                  : {}),
              }}
            >
              <ListItemIcon>
                <Icon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          flexGrow: 1,
          backgroundColor: "rgba(239, 239, 241, 0.7)",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  logo: {
    display: "flex",
    padding: "20px",
    alignItems: "center",
  },
  icon: {
    marginLeft: "10px",
    height: 40,
    fontSize: 25,
  },
});

const listStyle = {
  width: "86%",
  margin: "15px auto",
  padding: "13px 5px",
  borderRadius: "15px",

  "&:hover": {
    backgroundColor: "#FD6637",

    "& span": {
      color: "#ffffff",
    },

    "& svg": {
      color: "#ffffff",
    },
  },

  "& span": {
    color: "#A0A3BD",
  },
};
