import { makeStyles } from '@mui/styles';
import { Box } from "@mui/system";
import { Typography } from '@mui/material';
import CarouselButton from '../../../common/components/CarouselButton';

const useStyles = makeStyles({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '25px',
	},
});

const HeaderWithButton = ({ colors = "black",
	headerName = "No Header",
	setPage,
	page,
	totalPage,
	isShow = false
}) => {
	const classes = useStyles();

	return (
		<Box className={classes.header}>
			<Typography component="span" color={colors} fontSize="30px" fontWeight={600} >{headerName}</Typography>
			{isShow && <CarouselButton pageHandle={setPage} currentPage={page} totalPage={totalPage} />}
		</Box >
	);

};

export default HeaderWithButton;