import { useState } from 'react';
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
	CircularProgress,
} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import MainImage from './MainImage';
import UploadButton from './UploadButton';
import { noop, getUrl } from '~/common/utils';

const NewBannerDialog = ({
	setItems = noop,
	itemCount = 0,
	open = false,
	handleDialog = noop,
}) => {
	const [description, setDescription] = useState("");
	const [start_date, setStart_date] = useState(new Date);
	const [end_date, setEnd_date] = useState(new Date);
	const [visible, setVisible] = useState(true);
	const [keywords, setKeywords] = useState([]);
	const [tempKeywords, setTempKeywords] = useState("");
	const [tempPicture, setTempPicture] = useState("");
	const [file, setFile] = useState({});
	const [loading, setLoading] = useState(false);

	const handleAddBanner = async () => {
		if (!tempPicture || !description || !keywords) {
			handleDialog();
			return Swal.fire('Sorry', 'Please fill up all field before add new banner', 'warning');
		}

		let bannerImage = {};
		try {
			setLoading(true);
			const { success, original_link } = await getUrl(file);

			if (success) {
				bannerImage = {
					title: file.name,
					position: "Main",
					path: original_link,
					thumbnail: original_link,
				};
			}
			else {
				console.log(data.error);
				handleDialog();
				setLoading(false);
				return Swal.fire('Oop!', 'Cannot upload image', 'error');
			}
		}
		catch (err) {
			console.log(err.message);
			handleDialog();
			setLoading(false);
			return Swal.fire('Oop!', 'Cannot upload image', 'error');
		}

		axios
			.post(`${config.SERVER_URL}/home/banner`, {
				bannerInfo: {
					description,
					start_date,
					end_date,
					order: itemCount + 1,
					keywords,
					visible,
				},
				bannerImage,
			})
			.then(({ data }) => {
				if (data.success) {
					console.log(data.banner);

					setItems(items => {
						return [...items, data.banner];
					});
					setLoading(false);

					handleDialog();
					onClearChange();
					return Swal.fire('Done', "Already added a new banner", 'success');
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				handleDialog();
				return Swal.fire('Oop!', 'Cannot create a new banner', 'error');
			})
	};

	const onUploadMainImg = async (e) => {
		const files = e.target.files;

		if (files.length) {
			setFile(files[0]);
			setTempPicture(URL.createObjectURL(files[0]));
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
		setTempPicture("");
		setDescription("");
		setStart_date(new Date);
		setEnd_date(new Date);
		setVisible(true);
		setKeywords([]);
		setTempKeywords("");
	};

	return (
		<Dialog open={open} fullWidth maxWidth="md">
			<DialogTitle>Banner Information</DialogTitle>

			<DialogContent>
				<Grid container spacing={4}>
					<Grid item md={12}>
						<Typography fontSize={18} fontWeight={500} mb={2}>Main Picture</Typography>
						{tempPicture
							? <MainImage path={tempPicture} upload onUploadImg={onUploadMainImg} />
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
								onChange={(e) => setStart_date(e.toISOString())}
							/>
						</LocalizationProvider>
					</Grid>

					<Grid item md={6}>
						<Typography fontSize={18} fontWeight={500} mb={2}>End Date</Typography>
						<LocalizationProvider dateAdapter={DateAdapter}>
							<DatePicker
								value={end_date}
								renderInput={(params) => <TextField {...params} />}
								onChange={(e) => setEnd_date(e.toISOString())}
							/>
						</LocalizationProvider>
					</Grid>

					<Grid item md={6}>
						<Typography fontSize={18} fontWeight={500}>Banner Status</Typography>
						<RadioGroup
							aria-label="status"
							name="controlled-radio-buttons-group"
							value={visible}
							onChange={(e) => setVisible(e.target.value === 'true')}
						>
							<FormControlLabel label="Visible" value={true} control={<Radio />} />
							<FormControlLabel label="Invisible" value={false} control={<Radio />} />
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
								value={tempKeywords}
								disabled={keywords.length === 6}
								onChange={(e) => setTempKeywords(e.target.value)}
								onKeyPress={(e) => {
									if (e.key === 'Enter') {
										onChipAdd(tempKeywords);
										setTempKeywords("");
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
				{loading
					? (<Button><CircularProgress /></Button>)
					: (<>
						<Button onClick={() => {
							onClearChange();
							handleDialog();
						}}>Cancel</Button>
						<Button onClick={handleAddBanner}>Add Banner</Button>
					</>)}
			</DialogActions>
		</Dialog>
	);
};

export default NewBannerDialog;
