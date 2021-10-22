import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import RegisterInformation from "../components/RegisterInformation";
import RegisterAddress from "../components/RegisterAddress";
import StepperConnector from "../components/StepperConnector";
import StepperIcon from "../components/StepperIcon";
import { Fragment } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import CButton from "../../common/components/CButton";

const steps = ["Information", "Address"];

const RegisterInfoPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const classes = useStyles();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <div style={{ margin: "3% 0" }}>This is for navbar</div>
        <div className={classes.body}>
          <div className={classes.box}>
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
            <div>
              <div>
                {activeStep === 0 ? (
                  <RegisterInformation />
                ) : activeStep === 1 ? (
                  <RegisterAddress />
                ) : (
                  <div></div>
                )}
              </div>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <CButton
                  title={activeStep === steps.length - 1 ? "Finish" : "Next"}
                  onClick={handleNext}
                />
              </Box>
            </div>
          </div>
        </div>
      </div>
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
