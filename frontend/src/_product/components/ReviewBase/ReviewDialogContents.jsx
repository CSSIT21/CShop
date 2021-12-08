import { useState } from "react";
import { Box } from "@mui/system";
import ConditionAccordion from "./ConditionAccordion";
import ProductBox from "./ProductBox";
import StarBox from "./StarBox";
import GenaratedComments from "./GenaratedComments";
import CommentsBox from "./CommentsBox";

function ReviewDialogContents() {
  // Create function on this component and then sent them to other component.
  const [commentsText, setCommentsText] = useState("");

  const selectGenaratedComments = (newComment) => {
    setCommentsText(commentsText + " " + newComment);
    console.log(commentsText);
  };
  return (
    <Box>
      <ConditionAccordion />
      <ProductBox />
      <StarBox />
      {/* ให้ธันช่วยแก้ */}
      <GenaratedComments handleClick={selectGenaratedComments} />
      <CommentsBox />
    </Box>
  );
}

export default ReviewDialogContents;
