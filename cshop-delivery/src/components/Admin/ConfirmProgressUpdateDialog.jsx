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

const ConfirmProgressUpdateDialog = React.forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(false);
    const [correct] = React.useState(false);

    const handleClickOpen = () => {
        console.log("work");
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useImperativeHandle(ref, () => ({
        open(age) {
            handleClickOpen(age);
        },
    }));

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update information of cs2200000000012</DialogTitle>
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
                        />
                        <CustomTextField
                            placeholder="password"
                            helperText={
                                !correct
                                    ? ""
                                    : "username or password is incorrect"
                            }
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});
export default ConfirmProgressUpdateDialog;
