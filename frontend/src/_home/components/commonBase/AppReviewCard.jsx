import { Avatar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

const AppReviewCard = ({ review }) => {

    const classes = useStyles();

    return (
        <Box className={classes.commentWrapper} sx={{ background: `linear-gradient(92.51deg, ${review.bgColor} -0.02%, #FFFFFF 83.97%)` }}>
            <Box className={classes.commentBox}>
                <Typography>
                    {review.comment}
                </Typography>
            </Box>

            <Box className={classes.profileBox}>
                <Avatar
                    alt={review.nickname}
                    src={review.path}
                    sx={{
                        width: 40,
                        height: 40,
                        marginBottom: 1,
                    }}
                />
                <Typography color="#394160" fontSize="13px" fontWeight={500} mb={0.5}>
                    {review.nickname}
                </Typography>

                <Typography color="#A0A3BD" fontSize="10px" fontWeight={400}>
                    Commented on {review.review_date}
                </Typography>
            </Box>
        </Box >
    );
};

const useStyles = makeStyles({
    commentWrapper: {
        width: '100%',
        padding: '20px 30px',
        borderRadius: '20px',

        display: 'flex',
        justifyContent: "space-between",
    },

    commentBox: {
        display: 'flex',
        alignItems: "center",
    },

    profileBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
    },
});

export default AppReviewCard;