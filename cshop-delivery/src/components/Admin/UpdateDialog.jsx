import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CustomTextField from "../../styles/CustomMui/CustomTextField";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const UpdateDialog = React.forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(false);
    const [correct, setCorrect] = React.useState(false);
    const [newdetail, setNewDetail] = React.useState({
        newDetail: "",
        trackingNumber: "",
        username: "",
        password: "",
    });

    const handleClickOpen = (trackingNumber) => {
        setNewDetail({
            ...newdetail,
            trackingNumber: trackingNumber,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useImperativeHandle(ref, () => ({
        open(trackingNumber) {
            handleClickOpen(trackingNumber);
        },
    }));

    const updateDetail = async () => {
        const update = await axios.post(
            "http://localhost:8080/delivery/update-detail",
            {
                newDetail: newdetail.newDetail,
                trackingNumber: newdetail.trackingNumber,
                username: newdetail.username,
                password: newdetail.password,
                token: Cookies.get("cshop-delivery-admin"),
            }
        );
        if (update.data.success) {
            setCorrect(false);
            handleClose();
            window.location.reload();
        } else {
            setCorrect(true);
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Update information of {newdetail.trackingNumber}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To update the order, please enter your detail and your
                        password to confirm the information here. We will send
                        updates occasionally.
                    </DialogContentText>
                    <CustomTextField
                        placeholder="detail"
                        sx={{ margin: "20px 0" }}
                        fullWidth
                        onChange={(e) =>
                            setNewDetail({
                                ...newdetail,
                                newDetail: e.target.value,
                            })
                        }
                    />
                    <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                    >
                        <Typography variant="h6">Admin</Typography>
                        <CustomTextField
                            placeholder="username"
                            sx={{ margin: "10px 0" }}
                            onChange={(e) =>
                                setNewDetail({
                                    ...newdetail,
                                    username: e.target.value,
                                })
                            }
                        />
                        <CustomTextField
                            placeholder="password"
                            helperText={
                                !correct
                                    ? ""
                                    : "username or password is incorrect"
                            }
                            onChange={(e) =>
                                setNewDetail({
                                    ...newdetail,
                                    password: e.target.value,
                                })
                            }
                            type="password"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateDetail}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});
export default UpdateDialog;
