import { Avatar, Box, Divider, Typography } from "@mui/material";
import RatingStars from "./RatingStars";

const Comments = ({ imageURL, username, rating, comment }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          alignSelf: "self-start",
          marginTop: 3,
        }}
      >
        <Avatar
          alt={username.toUpperCase()}
          src={imageURL}
          sx={{ width: 72, height: 72, marginRight: 3 }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: "1.2rem" }} gutterBottom>
            {username}
          </Typography>
          <RatingStars
            value={rating}
            iconStyle={iconStyle}
            isComment
          ></RatingStars>
          <Typography sx={{ marginTop: 1, fontSize: "1rem" }}>
            {comment}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ alignSelf: "stretch", marginTop: 3 }} />
    </>
  );
};

const iconStyle = {
  width: "21.31px",
  height: "21.31px",
  color: "#FD6637",
};

export default Comments;
