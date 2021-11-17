import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import CardWrapper from "./CardWrapper";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { StarOutlineRounded, StarRateRounded } from "@mui/icons-material";
import Rating from "@mui/material/Rating";

const TabsController = ({ productComments = [], comments = [], ...rest }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", padding: "20px" }} {...rest}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        className={classes.tabs}
        TabIndicatorProps={{
          style: { height: "2px" },
        }}
      >
        <Tab
          disableRipple
          className={classes.tabStyle}
          label="Shop's reviews"
        />
        <Tab
          disableRipple
          className={classes.tabStyle}
          label="Product's review"
        />
      </Tabs>
      <Box sx={{ margin: "0 0 20px 120px" }}>
        <Typography
          sx={{ fontSize: "30px", fontWeight: "500", marginBottom: 0.5 }}
        >
          Rating 4.7 out of 5
        </Typography>
        <Rating
          defaultValue={4.7}
          precision={0.5}
          readOnly
          icon={
            <StarRateRounded
              style={{ color: "#FD6637", width: "32px", height: "32px" }}
            />
          }
          emptyIcon={
            <StarOutlineRounded
              style={{ color: "#FD6637", width: "32px", height: "32px" }}
            />
          }
        />
      </Box>
      <TabPanel value={value} index={0}>
        <CardWrapper items={comments} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CardWrapper items={productComments} />
      </TabPanel>
    </Box>
  );
};

export default TabsController;

const useStyles = makeStyles({
  tabs: {
    width: "100%",
    marginBottom: "60px",
  },
  tabStyle: {
    color: "#323232",
    textTransform: "capitalize !important",
    fontSize: "24px !important",
    width: "50% !important",
  },
});
