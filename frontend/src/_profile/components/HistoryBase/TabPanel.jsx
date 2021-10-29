import React from "react";
import Box from "@mui/material/Box";

const TabPanel = ({ children, value, index, ...rest }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...rest}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default TabPanel;
