import { Box, Divider, Typography } from "@mui/material";
import ShowMoreButton from "../../common/components/CButton";
const comments = [1, 2, 3, 4, 5];

const Comments = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Typography>comment</Typography> {/* Array + Map */}
        <Divider />
      </Box>
      <Box sx={{ marginTop: "50px" }}>
        <ShowMoreButton title="Show more comments"></ShowMoreButton>
      </Box>
    </Box>
  );
};

export default Comments;
