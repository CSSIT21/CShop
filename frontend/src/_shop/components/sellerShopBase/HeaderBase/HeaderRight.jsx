import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography, Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={1.2}>
          <Typography fontSize="16px" color="#78909c">
          <div> Rating</div>
          </Typography>
        </Grid>
        <Grid item xs={1.5}>
          <div>4.7</div>
        </Grid>
        <Grid item xs={1.2}>
          <Typography fontSize="16px" color="#78909c">
          <div>Followers</div>
          </Typography>
        </Grid>
        <Grid item xs={1.5}>
          <div>7.4k</div>
        </Grid>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={1.2}>
          <Typography fontSize="16px" color="#78909c">
          <div>Products</div>
          </Typography>
        </Grid>
        <Grid item xs={1.5}>
          <div>6666</div>
        </Grid>
        <Grid item xs={1.2}>
          <Typography fontSize="16px" color="#78909c">
          <div>Joined</div>
          </Typography>
        </Grid>
        <Grid item xs={1.5}>
          <div>4 years ago</div>
        </Grid>
      </Grid>
    </Box>
  );
}
