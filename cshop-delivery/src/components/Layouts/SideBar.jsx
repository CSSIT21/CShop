import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
    Box,
    List,
    CssBaseline,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Logo from "../../public/Outline.png";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link, useLocation } from "react-router-dom";
import ColorButton from "../../styles/CustomMui/ColorButton";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const generateLink = (Icon, title = "", path = "/") => ({ Icon, title, path });

let links = [
    generateLink(ReceiptIcon, "Requests", "/admin/requests"),
    generateLink(Inventory2Icon, "Packages", "/admin/packages"),
    generateLink(LocalShippingIcon, "Delivering", "/admin/delivering"),
    generateLink(CheckCircleIcon, "Success", "/admin/success"),
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

export default function Sidebar(props) {
    const classes = useStyles();
    //assigning location variable
    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    const history = useHistory();

    const logout = () => {
        Cookies.remove("cshop-delivery-admin");
        history.push("/");
    };

    const pathDetail = () => {
        switch (pathname) {
            case "/admin/requests":
                return "All requests";
            case "/admin/packages":
                return "Received All Packages";
            case "/admin/delivering":
                return "Delivering";
            default:
                return "Success";
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Drawer variant="permanent" open={true}>
                <Link className={classes.logo} to="/">
                    <img src={Logo} alt="logo" width="60px" />
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        sx={{ marginLeft: "15px" }}
                    >
                        Delivery
                    </Typography>
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
                                ...(pathname === path
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
            <Box component="main" className={classes.childrenBox}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h4">{pathDetail()}</Typography>
                    <ColorButton
                        size="large"
                        fullWidth
                        sx={{
                            height: "50px",
                            width: "120px",
                        }}
                        onClick={logout}
                    >
                        Logout
                    </ColorButton>
                </Box>
                <Box marginTop={3}>{props.children}</Box>
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
    childrenBox: {
        minHeight: "100vh",
        flexGrow: 1,
        backgroundColor: "rgba(239, 239, 241, 0.7)",
        padding: "27px 27px",
    },
});

const listStyle = {
    width: "86%",
    margin: "8px auto",
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
