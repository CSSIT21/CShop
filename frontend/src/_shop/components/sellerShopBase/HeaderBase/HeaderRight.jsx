import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function HeaderRight({ shopInfo = {} }) {
  const classes = useStyles();
  const { id } = useParams();
  const [date, setdate] = useState();
  const [rating, setrating] = useState(0);
  useEffect(() => {
    let a = shopInfo.rating;
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
    const joinDate = shopInfo.join_date;
    setdate(dayjs(joinDate).fromNow());
  }, [shopInfo]);
  return (
    <>
      <Box
        sx={{
          width: "50%",
          margin: "0 0 0 10%",
          height: "220px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid className={classes.gridMargin} container>
          <Grid item xs={3}>
            <Typography fontSize="16px" color="#78909c">
              Products
            </Typography>
          </Grid>
          <Grid item xs={3}>
            {shopInfo.products}
          </Grid>
          <Grid item xs={3}>
            <Typography fontSize="16px" color="#78909c">
              Cancel Rate
            </Typography>
          </Grid>
          <Grid item xs={3}>
            2%
          </Grid>
        </Grid>
        <Grid className={classes.gridMargin} container>
          <Grid item xs={3}>
            <Typography fontSize="16px" color="#78909c">
              Followers
            </Typography>
          </Grid>
          <Grid item xs={3}>
            {shopInfo.followers}
          </Grid>
          <Grid item xs={3}>
            <Typography fontSize="16px" color="#78909c">
              Joined
            </Typography>
          </Grid>
          <Grid item xs={3}>
            {date}
          </Grid>
        </Grid>
        <Grid className={classes.gridMargin} container>
          <Grid item xs={3}>
            <Typography fontSize="16px" color="#78909c">
              Rating
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Link to={`/shop/${id}/comment`}>
              {rating !== null ? rating : 0}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const useStyles = makeStyles({
  gridMargin: {
    margin: "0 0 40px 0",
  },
});
