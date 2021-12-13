import { useMemo } from 'react';
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import { noop, noot } from '~/common/utils';
import { nanoid } from 'nanoid';

const MainImage = ({
	path = "",
	title = "Banner picture",
	Icon = noot,
	upload = false,
	onUploadImg = noop,
	onClickHandler = noop,
	...rest
}) => {
	const classes = useStyles();
	const id = useMemo(() => nanoid(), []);

	return (
		<Box className={classes.hoverImage} {...rest}>
			<img
				width="100%"
				src={path}
				alt={title}
				style={{ display: "block", transition: "0.25s all ease-in-out" }}
			/>
			{upload
				? <label className={classes.iconStyle} htmlFor={`outlined-button-file-${id}`}>
					<Button
						component="span"
						variant="outlined"
						startIcon={<AddAPhotoRoundedIcon />}
						sx={{ borderWidth: "2px" }}
					>
						<input
							accept="image/*"
							id={`outlined-button-file-${id}`}
							type="file"
							style={{ display: 'none' }}
							onChange={onUploadImg}
						/>
						<Typography sx={{ textTransform: "capitalize" }}>
							Change Picture
						</Typography>
					</Button>
				</label>
				: <Box className={classes.iconStyle} onClick={onClickHandler}>
					<>{Icon}</>
				</Box>
			}
		</Box>
	);
};

const useStyles = makeStyles({
	hoverImage: {
		position: "relative",

		"&:hover img": {
			opacity: "0.5",
		},
		"&:hover .MuiSvgIcon-root, &:hover .MuiButton-root": {
			opacity: "1",
		},
		"& .MuiSvgIcon-root, .MuiButton-root": {
			opacity: "0",
		},
	},

	iconStyle: {
		color: "#FD6637",
		top: "50%",
		left: "50%",
		position: "absolute",
		transform: "translate(-50%, -50%)",
		transition: "0.25s all ease-in-out",
		cursor: "pointer"
	},
});

export default MainImage;
