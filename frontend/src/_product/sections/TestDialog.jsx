import React, { useState } from "react";
import ConfirmButton from "../../common/components/CButton";
import ConfirmDialogs from "~/common/components/ConfirmDialogs";
import { Box } from "@mui/system";
import ConditionsDialog from "../components/ConditionsDialog";
import ReviewDialog from "../components/ReviewDialog";
import ReviewDialogContents from "../components/ReviewDialogContents";

function TestDialog() {
  const [openThankYouDialog, setOpenThankYouDialog] = useState(false);

  const handleCloseThankYouDialog = () => {
    setOpenThankYouDialog(false);
  };
  const handleClickOpenThankYouDialog = () => {
    setOpenThankYouDialog(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {/* Thank you Dialog */}
      <Box sx={{ margin: "20px" }}>
        <ConfirmButton
          title="Confirm"
          width="200px"
          height="56px"
          onClick={handleClickOpenThankYouDialog}
          sx={{ marginLeft: "0px" }}
        />
        <ConfirmDialogs
          text="Thank you for the review"
          open={openThankYouDialog}
          handleClose={handleCloseThankYouDialog}
        />
      </Box>

      {/* Review Dialog */}
      <Box sx={{ margin: "20px" }}>
        <ReviewDialog>
          <ReviewDialogContents />
        </ReviewDialog>
      </Box>

      {/* Condition Test */}
      <Box
        sx={{
          margin: "20px",
          width: "75%",
          height: "450px",
          backgroundColor: "lightBlue",
        }}
      >
        <ConditionsDialog />
      </Box>
    </Box>
  );
}

export default TestDialog;
