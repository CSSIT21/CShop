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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBan,
    faCashRegister,
    faUser,
    faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const generateLink = (icon, title = "", path = "/") => ({ icon, title, path });

let links = [
    generateLink(faUser, "Users", "/manage/users"),
    generateLink(faCashRegister, "Sellers", "/manage/sellers"),
    generateLink(faUserSlash, "Banned users", "/manage/bannedusers"),
    generateLink(faBan, "Banned sellers", "/manage/bannedsellers"),
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

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Drawer variant="permanent" open={true}>
                <Box className={classes.logo}>
                    <img src={Logo} alt="logo" width="140px" />
                </Box>
                <List>
                    {links.map(({ icon, title, path }, index) => (
                        <ListItem button key={index} to={path} component={Link}>
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    icon={icon}
                                    className={classes.icon}
                                />
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} margin="15px 30px">
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
