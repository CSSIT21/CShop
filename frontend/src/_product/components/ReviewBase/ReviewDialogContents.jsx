import { Box } from "@mui/system";
import ConditionAccordion from "./ConditionAccordion";
import ProductBox from "./ProductBox";
import StarBox from "./StarBox";
import GeneratedComments from "./GeneratedComments";
import CommentsBox from "./CommentsBox";
import { Typography } from "@mui/material";

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
  img,
  productName,
  options,
}) {
  return (
    <Box>
      <ConditionAccordion />
      <ProductBox img={img} productName={[productName]} options={options} />
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
