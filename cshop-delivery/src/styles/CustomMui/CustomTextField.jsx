import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#fd6637",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#fd6637",
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: 12,
        "& fieldset": {
            borderColor: "#fd6637",
        },
        "&:hover fieldset": {
            borderColor: "#fd6637",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#fd6637",
        },
    },
});

export default CustomTextField;
