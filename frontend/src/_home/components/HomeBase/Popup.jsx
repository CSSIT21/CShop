import { useState } from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Checkbox,
	Box,
	Paper,
	Typography
} from '@mui/material';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { makeStyles } from '@mui/styles';
import { useRecoilValue } from 'recoil';
import authState from '~/common/store/authState';

const popup = {
	picture: "https://cdn.discordapp.com/attachments/900689889086046218/909339280608989234/png-popup.png",
	description: "Our websit will be closed for renovation. Sorry for inconvenience",
	start_date: "2022/02/12",
	end_date: "2022/02/14",
};

const Popup = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	const [checked, setChecked] = useState(false);
	const { isLoggedIn, user } = useRecoilValue(authState);

	const handleClose = () => {
		setOpen(false);
	};

	const onCheck = (e) => {
		setChecked(e.target.checked);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			PaperComponent={Box}
		>
			<CancelRoundedIcon className={classes.closeStyle} sx={{ fontSize: "1.9rem" }} onClick={handleClose} />

			<Paper className={classes.paperStyle}>
				<img className={classes.imgStyle} width={75} src={popup.picture} />

				<DialogTitle id="alert-dialog-title">
					{isLoggedIn
						? `Hi ${user.first_name}!`
						: `Hi User!`
					}
				</DialogTitle>

				<DialogContent>
					<DialogContentText sx={{ width: 300, textAlign: "center" }} id="alert-dialog-description">
						{popup.description}
					</DialogContentText>

					<Typography fontSize="12px" fontWeight={400} color="#A0A3BD" mt={4} sx={{ textAlign: "center" }}>
						During {popup.start_date} - {popup.end_date}
					</Typography>
				</DialogContent>
			</Paper>

			<DialogActions sx={{ display: "flex", justifyContent: "flex-start" }}>
				<Checkbox
					checked={checked}
					onChange={onCheck}
					size="small"
					sx={{ color: "#FD6637" }}
				/>
				<Typography fontSize="12px" fontWeight={400} color="#CCCCCC" >
					Not show all day
				</Typography>
			</DialogActions>
		</Dialog>
	);
};

const useStyles = makeStyles({
	paperStyle: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},

	imgStyle: {
		marginBottom: "10px",
		display: "block",
		transform: "translate(0, -70px) scale(4)",
	},

	closeStyle: {
		color: "white",
		position: "absolute",
		top: "-17%",
		right: "-8%",
		cursor: "pointer",

		"&:hover": {
			color: "#FD6637",
		},
	},
});

export default Popup
