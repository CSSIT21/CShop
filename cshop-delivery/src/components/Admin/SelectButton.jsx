import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation } from "react-router-dom";
import ConfirmProgressUpdateDialog from "./ConfirmProgressUpdateDialog";

export default function SelectButton() {
    const [age, setAge] = React.useState("");
    const confirmDialog = React.useRef(null);

    const handleChange = (event) => {
        confirmDialog.current.open(age);
        setAge(event.target.value);
    };

    const location = useLocation();
    const { pathname } = location;

    const checkPath = () => {
        switch (pathname) {
            case "/admin/requests":
                return 1;
            case "/admin/packages":
                return 2;
            default:
                return 3;
        }
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                    fullWidth
                >
                    {checkPath() < 2 ? (
                        <MenuItem value={2}>Received a package</MenuItem>
                    ) : null}
                    {checkPath() < 3 ? (
                        <MenuItem value={3}>Delivering</MenuItem>
                    ) : null}
                    {checkPath() < 4 ? (
                        <MenuItem value={4}>Success</MenuItem>
                    ) : null}
                </Select>
            </FormControl>
            <ConfirmProgressUpdateDialog ref={confirmDialog} />
        </Box>
    );
}
