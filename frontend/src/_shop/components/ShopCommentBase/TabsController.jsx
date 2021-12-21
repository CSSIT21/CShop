import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import CardWrapper from "./CardWrapper";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { StarOutlineRounded, StarRateRounded } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import axios from "axios";
import config from "~/common/constants";

const TabsController = ({ ...rest }) => {
  const classes = useStyles();
  const { id, cateId } = useParams();
  const [onLoad, setonLoad] = useState(false);
  const [value, setValue] = React.useState(0);
  const [rating, setrating] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    axios.get(`${config.SERVER_URL}/sellershop/${id}`).then(({ data }) => {
      if (data.shopinfo.rating) {
        setrating(Math.round(data.shopinfo.rating * 10) / 10);
      } else {
        setrating(0);
      }
    });
  }, []);
  return (
    <>
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
            Rating {rating} out of 5
          </Typography>
          <Rating
            defaultValue={rating}
            precision={0.1}
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
          <CardWrapper type="shop" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CardWrapper type="product" />
        </TabPanel>
      </Box>
    </>
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
