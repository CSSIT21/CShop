import { Box } from "@mui/system";
import ReviewDialog from "../components/ReviewBase/ReviewDialog";

function ReviewsFromCustomer({}) {
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
        <ReviewDialog sx={{ margin: "20px" }} />
      </Box>
    </Box>
  );
}

export default ReviewsFromCustomer;
