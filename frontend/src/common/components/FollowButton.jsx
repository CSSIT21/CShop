import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const FollowButton = ({ follow = false, ...rest }) => {
  const [state, setstate] = useState(follow);
  return (
    <>
      {state ? (
        <Button variant="contained" onClick={() => setstate(!state)} {...rest}>
          <AddIcon />
          Follow
        </Button>
      ) : (
        <Button variant="outlined" onClick={() => setstate(!state)} {...rest}>
          Following
        </Button>
      )}
    </>
  );
};

export default FollowButton;
