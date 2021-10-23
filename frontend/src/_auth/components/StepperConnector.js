import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { makeStyles } from "@mui/styles";

const StepperConnector = () => {
  const classes = useStyle();

  return <StepConnector className={classes.connector}></StepConnector>;
};

const useStyle = makeStyles((theme) => ({
  connector: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#CCCCCC",
      borderRadius: 1,
      margin: "4px 30px",
    },
  },
}));

export default StepperConnector;
