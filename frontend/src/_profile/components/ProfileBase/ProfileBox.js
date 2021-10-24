import React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ProfileBox = ({ icon = <></>, title = "", to = "/profile" }) => {
  return (
    <>
      <Button
        variant="outlined"
        disableElevation
        LinkComponent={Link}
        to={to}
        startIcon={icon}
        style={{
          textTransform: "capitalize",
          width: "30%",
          display: "flex",
          justifyContent: "flex-start",
          padding: "25px",
          marginRight: "50px",
          borderColor: "#D9DBE9",
        }}
      >
        <Typography
          sx={{ color: "black", fontSize: "20px", marginLeft: "10px" }}
        >
          {title}
        </Typography>
      </Button>
    </>
  );
};

export default ProfileBox;
