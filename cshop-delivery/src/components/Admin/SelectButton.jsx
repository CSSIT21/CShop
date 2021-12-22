import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation } from "react-router-dom";
import ConfirmProgressUpdateDialog from "./ConfirmProgressUpdateDialog";

export default function SelectButton({ status, tracking_number }) {
    // const [newProgress, setNewProgress] = React.useState(status);
    const confirmDialog = React.useRef(null);

    const handleChange = (event) => {
        console.log(event.target.value);
        confirmDialog.current.open(event.target.value, tracking_number, status);
        // setNewProgress(event.target.value);
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
        <Box sx={{ minWidth: 220 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{status}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    placeholder={status}
                    label={status}
                    value={status}
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value="Received a request" disabled>
                        Received a request
                    </MenuItem>
                    <MenuItem
                        value="Received a package"
                        disabled={checkPath() === 1 ? false : true}
                    >
                        Received a package
                    </MenuItem>
                    <MenuItem
                        value="Delivering"
                        disabled={checkPath() !== 3 ? false : true}
                    >
                        Delivering
                    </MenuItem>
                    <MenuItem value="Success">Success</MenuItem>
                </Select>
            </FormControl>
            <ConfirmProgressUpdateDialog ref={confirmDialog} />
        </Box>
    );
}
