import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Logo from "../../public/Outline.png";
import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const menusSelect = ["Admin"];

const NavBar = () => {
    const classes = useStyles();
    const history = useHistory();

    const checkCookie = () => {
        if (Cookies.get("cshop-delivery-admin")) {
            history.push("/admin");
        } else {
            history.push("/login");
        }
    };

    return (
        <Box className={classes.set} sx={{ boxShadow: 3 }}>
            <a href="/" className={classes.a}>
                <Box className={classes.logo}>
                    <img
                        src={Logo}
                        alt="Logo"
                        width="50px"
                        style={{ margin: "0 10px" }}
                    />
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        CShop Delivery
                    </Typography>
                </Box>
            </a>
            <Box className={classes.menu}>
                {menusSelect.map((menu) => {
                    return (
                        <Box onClick={checkCookie} className={classes.a}>
                            <Typography margin="0 20px">{menu}</Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    set: {
        height: "70px",
        width: "100vw",
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        backgroundColor: "white",
        top: "0",
        zIndex: 100,
    },
    logo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "30px",
        cursor: "pointer",
    },
    menu: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "40px",
    },
    a: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    },
}));

export default NavBar;
