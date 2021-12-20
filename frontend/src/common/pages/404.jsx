import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { nanoid } from 'nanoid';
const NotFoundPage = () => {
  const classes = useStyles();
  const router = useHistory();
  return (
    <>
      <Box className={classes.container}>
        <img
          src={`https://avatars.dicebear.com/api/micah/${nanoid()}.svg`}
          alt="Image"
          className={classes.pic}
        />
        <Typography
          sx={{
            fontSize: "100px",
            margin: "50px 0",
          }}
          color="primary"
        >
          404 PAGE NOT FOUND
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              width: "200px",
              height: "70px",
              fontSize: "20px",
              borderRadius: "12px",
              marginRight:"30px",
           
            }}
            onClick={() => {
              router.goBack();
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              width: "300px",
              height: "70px",
              fontSize: "20px",
              borderRadius: "12px",
            }}
            onClick={() => {
              router.push("/home");
            }}
          >
            Back to Home Page
          </Button>
        </Box>
      </Box>
    </>
  );
};
const useStyles = makeStyles({
  pic: {
    borderRadius: "10px",
    width: "250px",
    height: "250px",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
});
export default NotFoundPage;
