import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { makeStyles } from "@mui/styles";
import CoinPic from '~/common/assets/images/coinpic.png';
import { width } from '@mui/system';
import Typography from '@mui/material/Typography';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import Popuppic from '~/common/assets/images/popup.png';

const CoinRedeemPage = (coinredeem) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const classes = useStyles();
    const steps = [
        'Day1',
        'Day2',
        'Day3',
        'Day4',
        'Day5',
        'Day6',
        'Day7',
    ];

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
        setAnchorEl(event.currentTarget);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };
    return (
        <Box className={classes.background}>
            <Box className={classes.header}>
                <Box className={classes.header1}> CS</Box>
                <Box className={classes.header2}> Coin Rewards</Box>
            </Box>

            <Box className={classes.codeField}>

                <Box className={classes.coinbox}>

                    <Box sx={{
                        display: "flex",
                        marginTop: "75px"
                    }}>
                        <img src={CoinPic} alt="pic" style={{ height: "60px", width: "60px", alignItem: "center", marginTop: "5px" }} />

                        <Box className={classes.cointext}>1.11</Box>
                        <Box className={classes.cointext}><Link to="/coin/history" > ></Link></Box>
                    </Box>
                    <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItem: "center", marginTop: "75px" }}>
                        <Stepper nonLinear activeStep={'activeStep'}>

                            {steps.map((label, index) => (
                                <Step key={label} completed={completed[index]}>
                                    <StepButton color="inherit" onClick={handleStep(index)}>
                                        {label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>

                        {allStepsCompleted() ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}> </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset} sx={{
                                        backgroundColor: '#FD6637', color: 'white', marginTop: "60px",
                                        '&:hover': {
                                            backgroundColor: '#ffab91', color: 'white'
                                        }
                                    }}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {activeStep !== steps.length &&
                                    (completed[activeStep] ? (
                                        <Typography variant="caption" sx={{ display: 'inline-block', }}>
                                            Step {activeStep + 1}
                                        </Typography>
                                    ) : (
                                        <Button onClick={handleComplete} sx={{
                                            backgroundColor: '#FD6637', alignSelf: 'center', justifySelf: 'center', color: 'white', marginTop: "100px",
                                            '&:hover': {
                                                backgroundColor: '#ffab91', color: 'white'
                                            }
                                        }}>
                                            Check in today coin
                                        </Button>

                                    ))}
                            </React.Fragment>

                        )}
                    </Box>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                    >
                        <Box sx={{ p: 15, height: "200px", width: "500px", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItem: 'center' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }}>
                                <img src={Popuppic} alt="pic" style={{ height: "80px", width: "80px", alignItem: "center", marginBottom: "10px" }} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }}>
                                <Typography sx={{ fontSize: "20px", fontWeight: "600", marginbottom: "20px" }}>Congratulation!</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }}>
                                <Typography sx={{ color: "#FD6637", fontSize: "20px", fontWeight: "500", margintop: "10px" }}>you earned  1  coin</Typography>
                            </Box>
                        </Box>
                    </Popover>
                </Box>

            </Box>
        </Box>

    );
};

const useStyles = makeStyles({
    background: {
        backgroundColor: "#FDEEE9",
        width: "auto",
        height: "105vh",
        paddingTop: "50px",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "50px"
    },
    header1: {
        display: "flex",
        fontWeight: "600",
        fontSize: "45px",
        color: " #FD6637",
    },
    header2: {
        display: "flex",
        fontWeight: "600",
        fontSize: "45px",
        color: "black",
    },
    header3: {
        display: "flex",
        marginLeft: "10px",
        fontWeight: "400",
        fontSize: "30px",
        color: " #FD6637",
    },
    coinbox: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        width: "80vw",
        borderRadius: "30px",
        height: "500px",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingBottom: "100px"
    },
    cointext: {
        Color: "black",
        marginLeft: "18px",
        fontSize: "50px",
        fontWeight: "450"
    },
    codeField: {
        backgroundColor: "#FDEEE9",
        height: "100px",
        width: "100%",
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
    },

});

export default CoinRedeemPage;
