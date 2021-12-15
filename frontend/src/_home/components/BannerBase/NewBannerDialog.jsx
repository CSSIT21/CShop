import { useState, useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import config from "~/common/constants";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Stack,
	Typography,
	RadioGroup,
	Radio,
	Chip,
	FormControlLabel,
	Grid,
} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import MainImage from './MainImage';
import UploadButton from './UploadButton';
import { noop, convertFileBase64, getUrl } from '~/common/utils';

const NewBannerDialog = ({
	itemCount = 0,
	open = false,
	onClose = noop,
}) => {
	const [file, setFile] = useState({ path: "", title: "", fileBase64: "" });
	const [description, setDescription] = useState("");
	const [start_date, setStart_date] = useState("");
	const [end_date, setEnd_date] = useState("");
	const [visible, setVisible] = useState(true);
	const [keywords, setKeywords] = useState([]);
	const [tempKeyword, setTempKeyword] = useState("");

	const handleAddBanner = async () => {
		const url = await getUrl(file.fileBase64)
		console.log(url);

		// axios
		// 	.post(`${config.SERVER_URL}/home/banner`, {
		// 		bannerInfo: {
		// 			description,
		// 			start_date,
		// 			end_date,
		// 			order: itemCount + 1,
		// 			keywords,
		// 			visible,
		// 		},
		// 		bannerImage: {

		// 		},
		// 	})
		// 	.then(({ data }) => {
		// 		if (data.success) {
		// 			console.log(data.banners);
		// 			setItems(data.banners.map(item => ({ ...item, height: 100 })));
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		return Swal.fire('Cannot Show Banners', data.message, 'error');
		// 	})
	};

	const onUploadMainImg = async (e) => {
		if (e.target.files.length) {
			setFile({
				path: URL.createObjectURL(e.target.files[0]),
				title: e.target.files[0].name,
				fileBase64: await convertFileBase64(e.target.files[0])
			});
			e.target.value = null;
		}
	};

	const onChipAdd = (value) => {
		if (keywords.includes(value)) return;

		setKeywords(keywords => {
			return [...keywords, value];
		});
	};

	const onChipDelete = (value) => {
		setKeywords(keywords => {
			return keywords.filter(keyword => keyword !== value);
		});
	};

	const onClearChange = () => {
		setFile({ path: "", title: "", fileBase64: "" });
		setDescription("");
		setStart_date("");
		setEnd_date("");
		setVisible(true);
		setKeywords([]);
	};

	return (
		<Dialog open={open} fullWidth maxWidth="md">
			<DialogTitle>Banner Information</DialogTitle>

			<DialogContent>
				<Grid container spacing={4}>
					<Grid item md={12}>
						<Typography fontSize={18} fontWeight={500} mb={2}>Main Picture</Typography>
						{file.path
							? <MainImage path={file.path} upload onUploadImg={onUploadMainImg} />
							: <UploadButton
								onUploadImg={onUploadMainImg}
								Icon={<AddAPhotoRoundedIcon />}
								title="Choose Photo"
							/>
						}
					</Grid>

					<Grid item md={12}>
						<Typography fontSize={18} fontWeight={500} mb={2}>Description</Typography>
						<TextField
							label="Description"
							id="outlined-multiline-static"
							fullWidth
							multiline
							rows={3}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Grid>

					<Grid item md={6}>
						<Typography fontSize={18} fontWeight={500} mb={2}>Start Date</Typography>
						<LocalizationProvider dateAdapter={DateAdapter}>
							<DatePicker
								value={start_date}
								renderInput={(params) => <TextField {...params} />}
								onChange={(e) => setStart_date(e)}
							/>
						</LocalizationProvider>
					</Grid>

					<Grid item md={6}>
						<Typography fontSize={18} fontWeight={500} mb={2}>End Date</Typography>
						<LocalizationProvider dateAdapter={DateAdapter}>
							<DatePicker
								value={end_date}
								renderInput={(params) => <TextField {...params} />}
								onChange={(e) => setEnd_date(e)}
							/>
						</LocalizationProvider>
					</Grid>

					<Grid item md={6}>
						<Typography fontSize={18} fontWeight={500}>Banner Status</Typography>
						<RadioGroup
							aria-label="status"
							name="controlled-radio-buttons-group"
							value={visible}
							onChange={(e) => setVisible(e.target.value)}
						>
							<FormControlLabel label="Visible" value="true" control={<Radio />} />
							<FormControlLabel label="Invisible" value="false" control={<Radio />} />
						</RadioGroup>
					</Grid>

					<Grid item md={6}>
						<Typography fontSize={18} fontWeight={500} mb={2}>Keywords</Typography>
						<Grid container>
							{keywords.map((keyword, kwIndex) => (
								<Grid item md={4} mb={2} mr={1} key={kwIndex}>
									<Chip
										label={keyword}
										variant="outlined"
										sx={{
											width: "100%",
											color: "#FD6637",
											borderColor: "#FD6637",
											backgroundColor: "#FFF1EC"
										}}
										deleteIcon={<CancelRoundedIcon style={{ color: "#FD6637" }} />}
										onDelete={() => onChipDelete(keyword)}
									/>
								</Grid>
							))}
						</Grid>

						<Stack direction="row" spacing={2} alignItems="center">
							<TextField
								label="Keyword"
								id="outlined-size-small"
								size="small"
								value={tempKeyword}
								disabled={keywords.length === 6}
								onChange={(e) => setTempKeyword(e.target.value)}
								onKeyPress={(e) => {
									if (e.key === 'Enter') {
										onChipAdd(tempKeyword);
										setTempKeyword("");
									}
								}}
							/>

							<Typography fontSize={13} color="#A0A3BD" >
								{keywords.length}/6
							</Typography>
						</Stack>
					</Grid>
				</Grid>
			</DialogContent>

			<DialogActions>
				<Button onClick={() => {
					onClearChange();
					onClose();
				}}>Cancel</Button>
				<Button onClick={handleAddBanner}>Add Banner</Button>
			</DialogActions>
		</Dialog>
	);
};

export default NewBannerDialog;
