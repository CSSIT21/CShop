import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import PropTypes from "prop-types";

const CButton = ({
    title,
    size,
    icon = {},
    width,
    height,
    backgroundColor = "#FD6637",
    fontSize = "14px",
    style = {},
    ...rest
}) => {
    return (
        <Box>
            <Button
                variant="contained"
                style={{
                    backgroundColor: backgroundColor,
                    boxShadow: "none",
                    borderRadius: "12px",
                    width,
                    height,
                    ...style
                }}
                size={size}
                {...rest}
            >
                <Box display="flex" justifyContent="center" alignItems="center">
                    <FontAwesomeIcon
                        icon={icon}
                        style={{ marginRight: "7px" }}
                    />
                    <Typography sx={{ textTransform: 'capitalize', fontSize }}>{title}</Typography>
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
