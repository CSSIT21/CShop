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
  const [value, setValue] = React.useState(0);
  const [rating, setrating] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    axios.get(`${config.SERVER_URL}/sellershop/${id}`).then(({ data }) => {
      if (data.shopinfo.rating) {
        let a = data.shopinfo.rating;
        let floor = Math.floor(a);
        let r = Math.abs(floor - a);
        if (r > 0.5) {
          a = floor + 1;
        } else if (r == 0) {
          a = floor;
        } else if (r <= 0.5) {
          a = floor + 0.5;
        }
        setrating(a);
      } else {
        setrating(0);
      }
    });
  }, [value]);
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
            value={rating}
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
