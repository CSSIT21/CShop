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
    Grid
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const BannerInfo = ({
    item = {},
    index = 0,
    onInputChange = () => { },
    onChipAdd = () => { },
    onChipDelete = () => { },
    open = false,
    onClose = () => { }
}) => {
    const [tempKeyword, setTempKeyword] = useState("");

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Banner Information</DialogTitle>

            <DialogContent>
                <Stack direction="column" spacing={5}>
                    <Stack direction="column" spacing={2}>
                        <Typography fontSize={18} fontWeight={500}>Description</Typography>
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={3}
                            value={item.description}
                            onChange={(e) => onInputChange(e.target.value, index, "description")}
                        />
                    </Stack>

                    <Stack direction="row" spacing={5}>
                        <Stack direction="column" spacing={1} width="50%">
                            <Typography fontSize={18} fontWeight={500}>Start Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={item.start_date}
                                    onChange={(e) => onInputChange(e, index, "start_date")}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Stack>

                        <Stack direction="column" spacing={1} width="50%">
                            <Typography fontSize={18} fontWeight={500}>End Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={item.end_date}
                                    onChange={(e) => onInputChange(e, index, "end_date")}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Stack>

                    <Stack direction="row" spacing={5}>
                        <Stack direction="column" spacing={1} width="50%">
                            <Typography fontSize={18} fontWeight={500}>Banner Status</Typography>
                            <RadioGroup
                                aria-label="status"
                                name="controlled-radio-buttons-group"
                                value={item.status}
                                onChange={(e) => onInputChange(e.target.value, index, "status")}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Visible" />
                                <FormControlLabel value="false" control={<Radio />} label="Invisible" />
                            </RadioGroup>
                        </Stack>

                        <Stack direction="column" spacing={1} width="50%">
                            <Typography fontSize={18} fontWeight={500}>Keywords</Typography>

                            <Grid container>
                                {item.keywords.map((keyword, kwIndex) => (
                                    <Grid item md={4} mb={2} mr={2} key={kwIndex}>
                                        <Chip
                                            label={keyword}
                                            variant="outlined"
                                            onDelete={() => onChipDelete(index, kwIndex)}
                                            sx={{
                                                width: "100%",
                                                color: "#FD6637",
                                                borderColor: "#FD6637",
                                                backgroundColor: "#FFF1EC"
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>

                            <Stack direction="row" spacing={2} alignItems="center">
                                <TextField
                                    id="outlined-basic"
                                    label="Keyword"
                                    variant="outlined"
                                    disabled={item.keywords.length === 6}
                                    value={tempKeyword}
                                    onChange={(e) => setTempKeyword(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            onChipAdd(tempKeyword, index);
                                            setTempKeyword("");
                                        }
                                    }}
                                />
                                <Typography
                                    sx={{ textAlign: "center" }}
                                    fontSize={13}
                                    color="#A0A3BD"
                                >
                                    {item.keywords.length}/6
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Finish</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BannerInfo;