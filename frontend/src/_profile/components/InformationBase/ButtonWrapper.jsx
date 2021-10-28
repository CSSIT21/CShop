import React from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ConfirmDialogs from "../../../common/components/ConfirmDialogs";

const ButtonWrapper = ({ isEdit, setIsEdit }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {!isEdit && (
          <Button
            sx={buttonStyle}
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => {
              setIsEdit(!isEdit);
              window.scrollTo(0, 0);
            }}
          >
            Edit
          </Button>
        )}
        {isEdit && (
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Button
              sx={{
                width: "200px",
                height: "44px",
                margin: "80px 30px 100px 0",
                textTransform: "capitalize",
              }}
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => {
                window.scrollTo(0, 0);
                setIsEdit(!isEdit);
                setOpen(true);
              }}
            >
              Save Changes
            </Button>
            <Button
              sx={buttonStyle}
              variant="outlined"
              onClick={() => {
                window.scrollTo(0, 0);
                setIsEdit(!isEdit);
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
      <ConfirmDialogs
        open={open}
        handleClose={handleClose}
        text="Your information has been changed"
      />
    </>
  );
};

export default ButtonWrapper;
const buttonStyle = {
  width: "100px",
  height: "44px",
  margin: "80px 0 100px 0",
  textTransform: "capitalize",
};
