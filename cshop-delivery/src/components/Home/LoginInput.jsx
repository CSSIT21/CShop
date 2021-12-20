import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ColorButton from "../../styles/CustomMui/ColorButton";
import CustomTextField from "../../styles/CustomMui/CustomTextField";

const LoginInput = () => {
    const classes = useStyles();
    const history = useHistory();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [correct, setCorrect] = useState(false);

    const login = async () => {
        const fetchedLogin = await axios.post(
            "http://localhost:8080/delivery/login",
            {
                username: username,
                password: password,
            },
            {
                withCredentials: true,
            }
        );
        if (fetchedLogin.data.success) {
            history.push("/admin");
            setCorrect(false);
        } else {
            setCorrect(true);
        }
    };

    return (
        <Box className={classes.inputBox} sx={{ boxShadow: 3 }}>
            <Box className={classes.inputSubBox}>
                <Typography
                    variant="h3"
                    fontWeight={600}
                    sx={{ margin: "20px 0" }}
                >
                    Login
                </Typography>
                <Box className={classes.textFieldBox}>
                    <CustomTextField
                        sx={{ margin: "10px 0" }}
                        placeholder="username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        fullWidth
                    />
                    <CustomTextField
                        sx={{ margin: "10px 0" }}
                        placeholder="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                        helperText={
                            !correct ? "" : "username or password is incorrect"
                        }
                        fullWidth
                    />
                    <ColorButton
                        size="large"
                        fullWidth
                        sx={{ margin: "10px 0", height: "50px" }}
                        onClick={login}
                    >
                        Login
                    </ColorButton>
                </Box>
            </Box>
        </Box>
    );
};

const useStyles = makeStyles(() => ({
    inputBox: {
        backgroundColor: "white",
        width: "800px",
        height: "auto",
        borderRadius: "15px",
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "calc((100vh - 330px) /2)",
        marginBottom: "80px",
    },
    textFieldBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    inputSubBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
    },
}));

export default LoginInput;
