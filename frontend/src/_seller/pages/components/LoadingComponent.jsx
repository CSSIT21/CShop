import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingComponent = ({open}) => {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}
      >
        <DialogTitle id="responsive-dialog-title">
          <CircularProgress sx={{ color: "#FD6637" }} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: "bold", color: "#FD6637" }}>
            Loading...
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default LoadingComponent;
