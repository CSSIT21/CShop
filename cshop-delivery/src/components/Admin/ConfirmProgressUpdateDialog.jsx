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

const ConfirmProgressUpdateDialog = React.forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(false);
    const [newStatus, setNewStatus] = React.useState({
        newProgress: "",
        trackingNumber: "",
        username: "",
        password: "",
        oldStatus: "",
    });
    const [correct, setCorrect] = React.useState(false);

    const handleClickOpen = (newProgress, trackingNumber, status) => {
        setNewStatus({
            ...newStatus,
            newProgress: newProgress,
            oldStatus: status,
            trackingNumber: trackingNumber,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useImperativeHandle(ref, () => ({
        open(value, newProgress, trackingNumber, status) {
            handleClickOpen(value, newProgress, trackingNumber, status);
        },
    }));

    const changeStatus = async () => {
        console.log(newStatus);
        const change = await axios.post(
            "http://localhost:8080/delivery/change-status",
            {
                trackingNumber: newStatus.trackingNumber,
                token: Cookies.get("cshop-delivery-admin"),
                newStatus: newStatus.newProgress,
                username: newStatus.username,
                password: newStatus.password,
            }
        );

        if (change.data.success) {
            setCorrect(false);
            window.location.reload();
        } else {
            setCorrect(true);
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Update information of {newStatus.trackingNumber}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To update the order, please enter your detail and your
                        password to confirm the information here. We will send
                        updates occasionally.
                    </DialogContentText>
                    <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                    >
                        <Typography variant="h6">Admin</Typography>
                        <CustomTextField
                            placeholder="username"
                            sx={{ margin: "10px 0" }}
                            onChange={(e) => {
                                setNewStatus({
                                    ...newStatus,
                                    username: e.target.value,
                                });
                            }}
                        />
                        <CustomTextField
                            placeholder="password"
                            helperText={
                                !correct
                                    ? ""
                                    : "username or password is incorrect"
                            }
                            onChange={(e) => {
                                setNewStatus({
                                    ...newStatus,
                                    password: e.target.value,
                                });
                            }}
                            type="password"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={changeStatus}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});
export default ConfirmProgressUpdateDialog;
