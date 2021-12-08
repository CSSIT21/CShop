import { Box } from "@mui/system";
import React from "react";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Typography } from "@mui/material";

function ConditionsDialog() {
  return (
    <Box sx={{ margin: "16px 2px 10px 2px" }}>
      {/* head */}
      <Box
        sx={{
          borderBottom: "1px solid #FD6637",
          padding: "0 0 10px 0",
        }}
      >
        <Typography fontWeight="500" fontSize="18px">
          Getting Coins Conditions
        </Typography>
      </Box>

      {/* condition-1 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "30px 0 30px 10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <li />
          <Typography>Write your product review at least 100 words.</Typography>
        </Box>
        <Typography color="#FD6637">0.1 Coins</Typography>
      </Box>

      {/* condition-2 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "30px 0 30px 10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <li />
          <Typography>
            Write your product review at least 100 words <br /> and add at least
            1 picture.
          </Typography>
        </Box>
        <Typography color="#FD6637">0.5 Coins</Typography>
      </Box>

      {/* condition-alert */}
      <Box
        sx={{
          display: "flex",
          margin: "100px 0 0 0 ",
          color: "#A0A3BD",
        }}
      >
        <WarningAmberRoundedIcon sx={{ marginRight: "8px" }} />
        You will not get the coins from editting the review has been sent.
      </Box>
    </Box>
  );
}

export default ConditionsDialog;
