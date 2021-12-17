import { useEffect } from "react";
import { Fab } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box } from "@mui/system"
import Carousel from "~/common/components/Carousel";
import AppReviewCard from '../commonBase/AppReviewCard';
import axios, { Axios } from "axios";
import Swal from 'sweetalert2';
import config from "~/common/constants";

const ReviewCarousel = ({
	items = [],
	currentPage = 0,
	totalPage = 1,
	pageHandle = () => { },
	itemsPerRow = 0,
	loop = false,
}) => {

	const onPrev = () => {
		if (currentPage === 0) {
			pageHandle(totalPage - 1);
		} else {
			pageHandle(currentPage - 1);
		}
	};

	const onNext = () => {
		if (totalPage - 1 === currentPage) {
			pageHandle(0);
		} else {
			pageHandle(currentPage + 1);
		}
	};

	const getData = () => {
		axios
			.get(`${config.SERVER_URL}/review`)
			.then(({data}) => {
				if (data.success) {
					return setReview(data.review);
				}
				else {
					return console.log(data);
				}
			})
			.catch((err) => {
					return console.log(err.message);
			})
	};

	useEffect(() => {
		getData();
	}, [])

	return (
		<>
			<Fab
				aria-label="prev"
				size="small"
				sx={fabStyle}
				disabled={!loop && currentPage === 0}
				onClick={onPrev}
			>
				<ChevronLeft />
			</Fab>

			<Box sx={{ width: "90%" }}>
				<Carousel
					items={items}
					pageState={currentPage}
					setPageState={pageHandle}
					itemsPerRow={itemsPerRow}
					loop={loop}
				>
					{(item) => (
						<AppReviewCard review={item} key={item.id} />
					)}
				</Carousel>
			</Box>

			<Fab
				sx={fabStyle}
				size="small"
				aria-label="next"
				disabled={!loop && currentPage === totalPage - 1}
				onClick={onNext}
			>
				<ChevronRight />
			</Fab>
		</>
	);
};

const fabStyle = {
	backgroundColor: "white",
	boxShadow: "none",
	margin: "5px",

	"&:hover": {
		backgroundColor: "#ff7349",
		color: "white",
	},
}

export default ReviewCarousel;
