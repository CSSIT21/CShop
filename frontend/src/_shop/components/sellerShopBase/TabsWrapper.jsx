import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "../HistoryBase/TabPanel";
import CardWrapper from "../HistoryBase/CardWrapper";
import { makeStyles } from "@mui/styles";

const TabsController = ({ orders = [], ...rest }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const getColor = () => {
    return value === 0 ? "#D28C40" : value === 1 ? "#5B8125" : "#AC303A";
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }} {...rest}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        className={classes.tabs}
        TabIndicatorProps={{
          style: { backgroundColor: getColor(), height: "4px" },
        }}
        sx={{ marginBottom: "60px", bgcolor: "background.paper" }}
      >
        <Tab
          disableRipple
          className={classes.tabStyle}
          sx={{
            color: "#323232",
            textTransform: "capitalize",
            fontSize: "22px",
            "&.Mui-selected": {
              color: "#D28C40",
            },
          }}
          label="Waiting"
        />
        <Tab
          disableRipple
          className={classes.tabStyle}
          sx={{
            color: "#323232",
            textTransform: "capitalize",
            fontSize: "22px",
            "&.Mui-selected": {
              color: "#5B8125",
            },
          }}
          label="Success"
        />
        <Tab
          disableRipple
          className={classes.tabStyle}
          sx={{
            color: "#323232",
            textTransform: "capitalize",
            fontSize: "22px",

            "&.Mui-selected": {
              color: "#AC303A",
            },
          }}
          label="Cancel"
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <CardWrapper items={orders} status="waiting" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CardWrapper items={orders} status="success" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CardWrapper items={orders} status="cancel" />
      </TabPanel>
    </Box>
  );
};

export default TabsController;

const useStyles = makeStyles({
  tabStyle: {
    padding: "0 10% !important",
    margin: "0 4% !important",
  },
});