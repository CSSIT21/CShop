import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const CommentFooter = ({ commentDateTime }) => {
  const [dateTime, setDateTime] = useState();

  const commentDateTimeFormat = () => {
    let date = dayjs(commentDateTime).format("DD/MM/YYYY");
    let time = dayjs(commentDateTime).format("HH:mm");
    setDateTime(date + " at " + time);
  };
  useEffect(() => {
    commentDateTimeFormat();
  }, [dateTime]);

  // date = "23/12/2021", time = "10:00"
  // date at time
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        margin: "0",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          marginTop: 1.5,
          fontSize: "16px",
          fontWeight: "400",
          color: "#A0A3BD",
        }}
      >
        Commented on {dateTime}
      </Typography>
    </Box>
  );
};

export default CommentFooter;
