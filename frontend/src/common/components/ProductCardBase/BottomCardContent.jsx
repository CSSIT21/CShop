import React from "react";
import Typography from "@mui/material/Typography";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

const ConditionalIcon = ({ e }) => {
  if (e) {
    return (
      <FavoriteRoundedIcon
        sx={{
          color: "#FD6637",
        }}
        fontSize="inherit"
      />
    );
  }
  return (
    <FavoriteBorderRoundedIcon
      sx={{
        color: "#323232",
      }}
      fontSize="inherit"
    />
  );
};

const BottomCardContent = ({
  status,
  favourite = false,
  onFavourite,
  ...rest
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...rest}
    >
      <Typography variant="caption" fontSize=".65rem" color="#A0A3BD">
        {status}
      </Typography>
      <IconButton
        onClick={onFavourite}
        size="small"
        sx={{ fontWeight: "bold" }}
      >
        <ConditionalIcon e={favourite} />
      </IconButton>
    </Box>
  );
};

export default BottomCardContent;
