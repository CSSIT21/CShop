import {Box} from "@mui/system";
import React from "react";
import Sidebar from "../components/Sidebar";

const BannedSeller = () => {
    
    console.log(
        <Sidebar className="test" hello="hihihih">
            <Box>Hello sdoghjpasighyaiopwghyailosghauio;sdgh</Box>
        </Sidebar>
    )

    return (
        <div>
            <Sidebar className="test" hello="hihihih">
                <Box>Hello sdoghjpasighyaiopwghyailosghauio;sdgh</Box>
            </Sidebar>
        </div>
    );
};

export default BannedSeller;