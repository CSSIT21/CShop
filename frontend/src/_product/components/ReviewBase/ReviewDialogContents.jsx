import React from "react";
import { Box } from "@mui/system";
import ConditionAccordion from "./ConditionAccordion";

function ReviewDialogContents() {
  // Create function on this component and then sent them to other component.
  return (
    <Box>
      <ConditionAccordion />
      <Box className="productBox">productBox</Box>
      <Box className="starBox">starBox</Box>
      <Box className="genaratedComments">genaratedComments</Box>
      <Box className="commentsBox">commentsBox</Box>
    </Box>
  );
}

export default ReviewDialogContents;
