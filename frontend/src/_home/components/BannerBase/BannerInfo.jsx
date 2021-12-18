import { useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import config from "~/common/constants"
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
import { noop } from '~/common/utils';

const BannerInfo = ({
    setItems = noop,
    item = {},
    open = false,
    getData = noop,
    handleDialog = noop,
}) => {
    const [tempKeyword, setTempKeyword] = useState("");
    const [description, setDescription] = useState(item.description);
    const [start_date, setStart_date] = useState(item.start_date);
    const [end_date, setEnd_date] = useState(item.end_date);
    const [visible, setVisible] = useState(item.visible);
    const [keywords, setKeywords] = useState(item.keywords);
    const [loading, setLoading] = useState(false);

    const handleUpdateInfo = () => {
        setLoading(true);

        axios
            .patch(`${config.SERVER_URL}/home/banner/${item.id}`, {
                description,
                start_date,
                end_date,
                keywords,
                visible,
            })
            .then(({ data }) => {
                if (data.success) {
                    console.log(data.bannerInfo);
                    getData();
                    setLoading(false);
                    handleDialog();
                    return Swal.fire('Done', "Already updated banner's information", 'success');
                }
            })
            .catch((error) => {
                console.log(err.message);
                setLoading(false);
                handleDialog();
                return Swal.fire('Oop!', "Cannot update banner's information", 'error');
            })
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
        setDescription(item.description);
        setStart_date(item.start_date);
        setEnd_date(item.end_date);
        setVisible(item.visible);
        setKeywords(item.keywords);
    };

    return (
        <Dialog open={open} fullWidth maxWidth="md">
            <DialogTitle>Banner Information</DialogTitle>

            <DialogContent>
                <Grid container spacing={4}>
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
                {loading
                    ? (<Button><CircularProgress /></Button>)
                    : (<>
                        <Button onClick={() => {
                            onClearChange();
                            handleDialog();
                        }}>Cancel</Button>
                        <Button onClick={handleUpdateInfo}>Save</Button>
                    </>)}
            </DialogActions>
        </Dialog>
    );
};

export default BannerInfo;