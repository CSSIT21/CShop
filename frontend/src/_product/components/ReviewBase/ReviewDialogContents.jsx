import { useState } from "react";
import { Box } from "@mui/system";
import ConditionAccordion from "./ConditionAccordion";
import ProductBox from "./ProductBox";
import StarBox from "./StarBox";
import GeneratedComments from "./GeneratedComments";
import CommentsBox from "./CommentsBox";

function ReviewDialogContents({
  generatedCommentsData,
  setChipData,
  value,
  setValue,
  handleChange,
}) {
  // Create function on this component and then sent them to other component.
  const [commentsText, setCommentsText] = useState("");

  const selectGeneratedComments = (newComment) => {
    setCommentsText(commentsText + " " + newComment);
    console.log(commentsText);
  };

  return (
    <Box>
      <ConditionAccordion />
      <ProductBox />
      <StarBox />
      <GeneratedComments
        generatedComments={generatedCommentsData}
        setChipData={setChipData}
      />
      <CommentsBox
        value={value}
        setValue={setValue}
        handleChange={handleChange}
      />
    </Box>
  );
}

export default ReviewDialogContents;
