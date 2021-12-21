import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#fd6637"),
    backgroundColor: "#ff845e",
    borderRadius: 12,
    textTransform: "none",
    "&:hover": {
        backgroundColor: "#fd6637",
    },
}));

export default ColorButton;
