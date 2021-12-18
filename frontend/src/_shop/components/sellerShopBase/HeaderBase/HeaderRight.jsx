import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));
dayjs.extend(relativeTime);

export default function HeaderRight({ shopInfo = {} }) {
  const classes = useStyles();
  const { id } = useParams();
  const [date, setdate] = useState();
  useEffect(() => {
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
              {shopInfo.rating !== null ? parseFloat(shopInfo.rating).toFixed(1) : 0}
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
