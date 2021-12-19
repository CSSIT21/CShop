import { Box, Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

/*
 Position:
  - 1: First element
  - 2: Between element
  - 3: Last element
 */

const TimelineDot = ({ position, time, detail, size = 0 }) => {
    const classes = useStyles({
        isLast: position === 1,
        size: size,
    });

    const convertTime = (time) => {
        const converted = time.split("T");
        return `${converted[0]}  ${converted[1].substring(0, 5)}`;
    };

    return (
        <div className={classes.root}>
            <div className={classes.dot} />
            {position <= 0 && <div className={classes.lineUpper} />}
            {position >= 0 && <div className={classes.lineLower} />}
            <Box marginLeft={12} marginY={2} width="100%">
                <Card sx={{ width: "100%" }} elevation={0}>
                    <CardContent>
                        <Typography>
                            {convertTime(new Date(time).toISOString())}
                        </Typography>
                        <Typography>{detail}</Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        display: "flex",
    },
    lineUpper: {
        position: "absolute",
        top: 0,
        left: 16,
        width: 1,
        height: 24,
        backgroundColor: ({ length }) =>
            length === 1 ? "#fd6637" : "rgb(122, 122, 122)",
    },
    lineLower: {
        position: "absolute",
        top: 40,
        left: 16,
        width: 1,
        bottom: 0,
        backgroundImage: ({ isLast }) =>
            isLast
                ? "linear-gradient(to bottom, #fd6637, #ec6073, #c26e94, #937995, #7a7a7a)"
                : "",
        backgroundColor: "rgb(122, 122, 122)",
    },
    dot: {
        position: "absolute",
        top: 24,
        left: 8,
        width: 16,
        height: 16,
        backgroundColor: ({ isLast }) =>
            isLast ? "#fd6637" : "rgb(122, 122, 122)",
        borderRadius: 8,
    },
}));
//rgb(122, 122, 122)
TimelineDot.propTypes = {};

export default TimelineDot;
