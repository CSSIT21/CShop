// import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export default function RowAndColumnSpacing() {
  const classes = useStyles();
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
            6666
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
            7.4k
          </Grid>
          <Grid item xs={3}>
            <Typography fontSize="16px" color="#78909c">
              Joined
            </Typography>
          </Grid>
          <Grid item xs={3}>
            4 years ago
          </Grid>
        </Grid>
        <Grid className={classes.gridMargin} container>
          <Grid item xs={3}>
            <Typography fontSize="16px" color="#78909c">
              Rating
            </Typography>
          </Grid>
          <Grid item xs={3}>
            4.7
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

