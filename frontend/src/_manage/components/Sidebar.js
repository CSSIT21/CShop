import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import Logo from "../../common/assets/images/Outline.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBan,
    faCashRegister,
    faUser,
    faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const drawerWidth = 240;

let icon = [faUser, faCashRegister, faUserSlash, faBan];
let route = ["users", "sellers", "bannedusers", "bannedsellers"];

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

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Drawer variant="permanent" open={true}>
                {/* <DrawerHeader>
                    <Box></Box>
                </DrawerHeader> */}
                <Box className={classes.logo}>
                    <img src={Logo} alt="logo" width="50px" />
                    <Typography variant="h5" fontWeight={700} marginLeft="10px">
                        CShop
                    </Typography>
                </Box>
                <List>
                    {["Users", "Sellers", "Banned users", "Banned sellers"].map(
                        (text, index) => (
                            <ListItem
                                button
                                key={text}
                                to={`/manage/${route[index]}`}
                                component={Link}
                            >
                                <ListItemIcon>
                                    <FontAwesomeIcon
                                        icon={icon[index]}
                                        className={classes.icon}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    )}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
