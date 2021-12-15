import { Box } from "@mui/system";
import ConditionAccordion from "./ConditionAccordion";
import ProductBox from "./ProductBox";
import StarBox from "./StarBox";
import GeneratedComments from "./GeneratedComments";
import CommentsBox from "./CommentsBox";

function ReviewDialogContents({
  generatedCommentsData,
  setChipData,
  commentProduct,
  setCommentProduct,
  commentShop,
  setCommentShop,
  imageList,
  setImageList,
  onUploadFile,
  deleteImage,
  starScore,
  setStarScore,
  handleChangeCommentProduct,
  handleChangeCommentShop,
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
        commentProduct={commentProduct}
        setCommentProduct={setCommentProduct}
        commentShop={commentShop}
        setCommentShop={setCommentShop}
        handleChangeCommentProduct={handleChangeCommentProduct}
        handleChangeCommentShop={handleChangeCommentShop}
        imageList={imageList}
        setImageList={setImageList}
        onUploadFile={onUploadFile}
        deleteImage={deleteImage}
      />
    </Box>
  );
}

export default ReviewDialogContents;
