import { useState } from 'react';
import { Box } from "@mui/system"
import { makeStyles } from '@mui/styles';
import { Typography } from "@mui/material";
import Carousel from "~/common/components/Carousel";
import AppReviewCard from '../commonBase/AppReviewCard';
import { text } from '@fortawesome/fontawesome-svg-core';
import CustomDot from "~/common/components/CarouselBase/CustomDot";

const reviewItems = [
    {
		id: 0,
        comment: "content" ,
        name: "name",
        profilePic: "",
        date: "11/15/2021",
        bgColor: "#CED4FF",
    },
    {
		id: 1,
        comment: "content" ,
        name: "name",
        profilePic: "",
        date: "11/15/2021",
        bgColor:"#CED4FF",
    },
    {
		id: 2,
        comment: "content" ,
        name: "name",
        profilePic: "",
        date: "11/15/2021",
        bgColor:"#CED4FF"
    },
];

const AppReviewSection = () => {
    
  	const [items] = useState(reviewItems);
	const [page, setPage] = useState(0);
	const classes = useStyles();
	const itemsPerRow = 2;
	const totalPage = Math.ceil(items.length / itemsPerRow);

    return (
        <Box className={ classes.AppReviewWrapper}>
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
				
            <Box className={classes.commentSection}>
				<Carousel
					items={items}
					pageState={page}
					setPageState={setPage}
					itemsPerRow={itemsPerRow}
					itemsPerRow={2}
					hideArrow={false}
				>
					{(item) => (
                			<AppReviewCard review={item} key={item.id} />
					)}
				</Carousel>
            </Box>

            <CustomDot width={50}  setPageState={setPage} currentPage={page} totalPage={totalPage} />
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
    commentSection: {
        width:"100%",
        display: "flex",
        justifyContent: "center",

        marginTop: "70px",
        marginBottom: "70px",
    },

});

export default AppReviewSection;