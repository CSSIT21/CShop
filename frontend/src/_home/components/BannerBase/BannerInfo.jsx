import { useState } from 'react';
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { noop } from '~/common/utils';

const BannerInfo = ({
    item = {},
    onInputChange = noop,
    onChipAdd = noop,
    onChipDelete = noop,
    open = false,
    onClose = noop
}) => {
    const [tempKeyword, setTempKeyword] = useState("");

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
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
                            value={item.description}
                            onChange={(e) => onInputChange(e.target.value, "description")}
                        />
                    </Grid>

                    <Grid item md={6}>
                        <Typography fontSize={18} fontWeight={500} mb={2}>Start Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={item.start_date}
                                renderInput={(params) => <TextField {...params} />}
                                onChange={(e) => onInputChange(e, "start_date")}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item md={6}>
                        <Typography fontSize={18} fontWeight={500} mb={2}>End Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={item.end_date}
                                renderInput={(params) => <TextField {...params} />}
                                onChange={(e) => onInputChange(e, "end_date")}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item md={6}>
                        <Typography fontSize={18} fontWeight={500}>Banner Status</Typography>
                        <RadioGroup
                            aria-label="status"
                            name="controlled-radio-buttons-group"
                            value={item.status}
                            onChange={(e) => onInputChange(e.target.value, "status")}
                        >
                            <FormControlLabel label="Visible" value="true" control={<Radio />} />
                            <FormControlLabel label="Invisible" value="false" control={<Radio />} />
                        </RadioGroup>
                    </Grid>

                    <Grid item md={6}>
                        <Typography fontSize={18} fontWeight={500} mb={2}>Keywords</Typography>
                        <Grid container>
                            {item.keywords.map((keyword, kwIndex) => (
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
                                        onDelete={() => onChipDelete(kwIndex)}
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
                                disabled={item.keywords.length === 6}
                                onChange={(e) => setTempKeyword(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        onChipAdd(tempKeyword);
                                        setTempKeyword("");
                                    }
                                }}
                            />

                            <Typography fontSize={13} color="#A0A3BD" >
                                {item.keywords.length}/6
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Finish</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BannerInfo;