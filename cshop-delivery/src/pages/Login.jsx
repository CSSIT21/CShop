import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import LoginInput from "../components/Home/LoginInput";
import Express from "../public/Express.jpg";

const Login = () => {
    const classes = useStyles();

    return (
        <Box className={classes.section}>
            <LoginInput />
            <Box className={classes.background} />
        </Box>
    );
};

const useStyles = makeStyles(() => ({
    section: {
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    background: {
        position: "fixed",
        inset: 0,
        zIndex: -1,
        backgroundImage: `url(${Express})`,
        filter: "blur(5px) brightness(0.9)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
}));

export default Login;
