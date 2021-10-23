import { Typography } from "@mui/material";
import ShowMoreButton from "../../common/components/CButton";
const comments = [1, 2, 3, 4, 5];

const Comments = (props) => {
  return (
    <>
      <Typography>comment</Typography> {/* Array + Map */}
      <ShowMoreButton title="Show more comments"></ShowMoreButton>
    </>
  );
};

export default Comments;
