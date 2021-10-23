import { makeStyles } from "@mui/styles";
import Check from "@mui/icons-material/Check";
import { Box } from "@mui/system";

const StepperIcon = ({ active, completed, className, activeStep }) => {
  const classes = useStyle({
    active,
  });
  const num = [1, 2, 3];
  return (
    <Box>
      <Box className={`${className} ${classes.qontoStepIconRoot}`}>
        {completed ? (
          <Check className="QontoStepIcon-completed" />
        ) : active ? (
          <Box className="QontoStepIcon">
            <Box className={classes.stepperText}>{activeStep + 1}</Box>
          </Box>
        ) : (
          <Box className="QontoStepIcon">
            <Box className={classes.stepperText}>{activeStep + 2}</Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const useStyle = makeStyles(() => ({
  qontoStepIconRoot: {
    display: "flex",
    height: 22,
    alignItems: "center",
    color: ({ active }) => (active ? "#FD6637" : "#CCCCCC"),
    "& .QontoStepIcon-completed": {
      color: "white",
      backgroundColor: "#00BF9D",
      width: 25,
      height: 25,
      padding: "18px",
      borderRadius: "50%",
    },
    "& .QontoStepIcon": {
      width: 60,
      height: 60,
      borderRadius: "50%",
      backgroundColor: "currentColor",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  stepperText: {
    display: "flex",
    color: "white",
    fontSize: "20px",
  },
}));

export default StepperIcon;
