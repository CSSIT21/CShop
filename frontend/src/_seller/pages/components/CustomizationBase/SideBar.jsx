import React from 'react'
import { Box } from "@mui/system";

const SideBar = ({children}) => {
    return (
        <Box sx={{width: "400px"}}>
            {children}
        </Box>
    )
}

export default SideBar;
