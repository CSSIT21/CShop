import { useState } from 'react';
import { Box } from "@mui/system"
import { makeStyles } from '@mui/styles';
import { Typography } from "@mui/material";
import CustomDot from "~/common/components/CarouselBase/CustomDot";
import ReviewCarousel from './ReviewCarousel';

const reviewItems = [
    {
        id: 0,
        comment: "The best website I ever used :)",
        name: "ShopP",
        profilePic: "",
        date: "11/15/2021",
        bgColor: "#CED4FF",
    },
    {
        id: 1,
        comment: "What is this?",
        name: "What my name",
        profilePic: "",
        date: "11/15/2021",
        bgColor: "#FDB098",
    },
    {
        id: 2,
        comment: "Really good website to try",
        name: "It's me",
        profilePic: "",
        date: "11/15/2021",
        bgColor: "#CED4FF"
    },
];

const AppReviewSection = () => {

    const classes = useStyles();
    const [items] = useState(reviewItems);
    const [page, setPage] = useState(0);
    const itemsPerRow = 2;
    const totalPage = Math.ceil(items.length / itemsPerRow);

    return (
        <Box className={classes.AppReviewWrapper}>
            <Typography
                component="div"
                fontSize="20px"
                fontWeight={600}
                color="#394160"

                display="flex"
                justifyContent="center"
            >
                Want to tell &nbsp;
                <Typography
                    color="#FD6637"
                    fontSize="20px"
                    fontWeight={600}
                >C</Typography>
                Shop that...
            </Typography>

            <Box className={classes.reviewSection}>
                <ReviewCarousel
                    items={items}
                    currentPage={page}
                    totalPage={totalPage}
                    pageHandle={setPage}
                    itemsPerRow={itemsPerRow}
                />
            </Box>

            <CustomDot width={50} setPageState={setPage} currentPage={page} totalPage={totalPage} />
        </Box>
    );
};

const useStyles = makeStyles({
    AppReviewWrapper: {
        width: "100%",
        boxSizing: "border-box",
        padding: "50px",
        backgroundColor: "#F4F5F6",

    },
    reviewSection: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        margin: "60px 0",
    },
});

export default AppReviewSection;