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
  imageList,
  setImageList,
  onUploadFile,
  deleteImage,
  starScore,
  setStarScore,
}) {
  return (
    <Box>
      <ConditionAccordion />
      <ProductBox />
      <StarBox starScore={starScore} setStarScore={setStarScore} />
      <GeneratedComments
        generatedComments={generatedCommentsData}
        setChipData={setChipData}
      />
      <CommentsBox
        value={value}
        setValue={setValue}
        handleChange={handleChange}
        imageList={imageList}
        setImageList={setImageList}
        onUploadFile={onUploadFile}
        deleteImage={deleteImage}
      />
    </Box>
  );
}

export default ReviewDialogContents;
