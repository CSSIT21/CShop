import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import RegisterInformation from "../components/RegisterInformation";
import RegisterAddress from "../components/RegisterAddress";
import StepperConnector from "../components/StepperConnector";
import StepperIcon from "../components/StepperIcon";
import { Fragment } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Success from "../components/Success";

const steps = ["Information", "Address"];

const RegisterInfoPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const classes = useStyles();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };
  const handleRegister = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Fragment>
      <Box className={classes.container}>
        <Box className={classes.body}>
          <Box className={classes.box}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              connector={<StepperConnector />}
              className={classes.stepper}
            >
              {steps.map((label, index) => {
                const stepProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel
                      className={classes.label}
                      StepIconComponent={({ active, completed, className }) => (
                        <StepperIcon
                          active={active}
                          completed={completed}
                          className={className}
                          activeStep={activeStep}
                        />
                      )}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Box>
              <Box>
                {activeStep === 0 ? (
                  <RegisterInformation
                    activeStep={activeStep}
                    handleNext={() => handleNext()}
                  />
                ) : activeStep === 1 ? (
                  <RegisterAddress
                    activeStep={activeStep}
                    handleBack={() => handleBack()}
                    handleRegister={() => handleRegister()}
                  />
                ) : activeStep === 2 ? (
                  <Success />
                ) : (
                  <Box></Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  box: {
    width: "60%",
    paddingTop: "5%",
  },
  body: {
    backgroundColor: "#f3f4f5",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  label: {
    "& span": {
      fontSize: 15,
      paddingTop: 8,
    },
  },
  stepper: {
    marginLeft: "50px",
    marginRight: "50px",
  },
});

export default RegisterInfoPage;
