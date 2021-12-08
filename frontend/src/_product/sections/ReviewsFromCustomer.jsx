import React, { useState } from "react";
import { Box } from "@mui/system";
import ReviewDialog from "../components/ReviewBase/ReviewDialog";
import ReviewDialogContents from "../components/ReviewBase/ReviewDialogContents";

function ReviewsFromCustomer() {
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
      {/* Review Dialog */}
      <Box>
        <ReviewDialog sx={{ margin: "20px" }}>
          <ReviewDialogContents />
        </ReviewDialog>
      </Box>
    </Box>
  );
}

export default ReviewsFromCustomer;
