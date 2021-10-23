import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import PropTypes from "prop-types";

const CButton = ({ title, size, icon, width, height, ...rest }) => {
    return (
        <Box>
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
                {...rest}
            >
                <Box display="flex" justifyContent="center" alignItems="center">
                    <FontAwesomeIcon
                        icon={icon}
                        style={{ marginRight: "7px" }}
                    />
                    <Typography>{title}</Typography>
                </Box>
            </Button>
        </Box>
    );
};

CButton.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string,
    icon: PropTypes.object,
    width: PropTypes.string,
    height: PropTypes.string,
};

export default CButton;
