import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  List,
  CssBaseline,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Logo from "../assets/images/Logo.svg";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import NoAccountsRoundedIcon from "@mui/icons-material/NoAccountsRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import ViewCarouselRoundedIcon from "@mui/icons-material/ViewCarouselRounded";
import { Link, useLocation } from "react-router-dom";
import { useMiddleware } from "../hooks";

const drawerWidth = 240;

const generateLink = (Icon, title = "", path = "/") => ({ Icon, title, path });

let links = [
  generateLink(PersonRoundedIcon, "Users", "/manage/users"),
  generateLink(StoreRoundedIcon, "Sellers", "/manage/sellers"),
  generateLink(NoAccountsRoundedIcon, "Banned users", "/manage/bannedusers"),
  generateLink(BlockRoundedIcon, "Banned sellers", "/manage/bannedsellers"),
  generateLink(ViewCarouselRoundedIcon, "Banner", "/manage/banner"),
];

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
  border: "none",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SidebarLayout(props) {
  const classes = useStyles();
  //assigning location variable
  const location = useLocation();
  useMiddleware();

  //destructuring pathname from location
  const { pathname } = location;

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
    color: "#A0A3BD",
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
