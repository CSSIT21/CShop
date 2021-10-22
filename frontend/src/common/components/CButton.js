import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";

const CButton = ({ title, size, icon, width, height }) => {
    return (
        <div>
            <Button
                variant="contained"
                style={{
                    backgroundColor: "#FD6637",
                    boxShadow: "none",
                    borderRadius: "12px",
                    width: width,
                    height: height,
                }}
                size={size}
            >
                <Box>
                    <FontAwesomeIcon
                        icon={icon}
                        style={{ marginRight: "7px" }}
                    />
                    {title}
                </Box>
            </Button>
        </div>
    );
};

export default CButton;
