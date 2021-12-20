import { Avatar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import dayjs from "dayjs";

const AppReviewCard = ({ review }) => {

    const classes = useStyles();

    return (
        <Box className={classes.commentWrapper} sx={{ background: `linear-gradient(92.51deg, ${review.theme_color} -0.02%, #FFFFFF 83.97%)` }}>
            <Box className={classes.commentBox}>
                <Typography >
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
                <Typography color="#394160" fontSize="14px" fontWeight={500} mb={0.5}>
                    {review.nickname}
                </Typography>

                <Typography color="#A0A3BD" fontSize="12px" fontWeight={400}>
                    reviewed on {dayjs(review.review_date).format('YYYY/MM/DD')}
                </Typography>
            </Box>
        </Box >
    );
};

const useStyles = makeStyles({
    commentWrapper: {
        display: 'flex',
        width: '100%',
        padding: '20px 30px',
        borderRadius: '20px',
    },

    commentBox: {
        width: '70%',
        display: 'flex',
        alignItems: 'center',
    },

    profileBox: {
        width: "30%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
    },
});

export default AppReviewCard;