import React, { Fragment } from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import CButton from "../../common/components/CButton";
import { useHistory } from "react-router";
const Success = () => {
  const classes = useStyles();
  const router = useHistory();

  return (
    <Fragment>
      <Box className={classes.header}>Successfully Registeration</Box>
      <Box className={classes.button}>
        <CButton
          title="Go To Homepage"
          width="470px"
          height="55px"
          onClick={() => {
            router.push("/home");
          }}
        />
      </Box>
    </Fragment>
  );
};

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: 600,
    marginTop: "7%",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    margin: "50px 0 180px 0",
  },
});
export default Success;
