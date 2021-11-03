import { borderBottom, Box } from "@mui/system";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  navbar_container: {
    display:"flex",
    justifyContent:"center",
    background: '#FDF4DD',
    height: "20vh",
    alignItems:"center",
    borderBottom:"1px solid black"
  },
});

const NavBar = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.navbar_container}>
      <Typography variant="h3">NavBar from ann</Typography>
    </Box>
  );
};
export default NavBar;
