import { useState } from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

const ButtonWrapper = ({ isEdit, setIsEdit, updateInfo, isLoading }) => {
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
            {!isLoading ? (
              <Button
                sx={{
                  width: "180px",
                  height: "44px",
                  margin: "80px 30px 100px 0",
                  textTransform: "capitalize",
                }}
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => {
                  updateInfo();
                }}
              >
                Update
              </Button>
            ) : (
              <LoadingButton
                loading
                variant="contained"
                sx={{
                  width: "180px",
                  textTransform: "capitalize",
                  height: "44px",
                  margin: "80px 30px 100px 0",
                }}
              ></LoadingButton>
            )}

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
