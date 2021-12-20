import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import InputBox from "../components/Home/InputBox";
import Express from "../public/Express.jpg";

const Home = () => {
    const classes = useStyles();

    return (
        <Box className={classes.section}>
            <InputBox />
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

export default Home;
