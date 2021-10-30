import { Box, Divider, Rating, Tooltip, Grid, Button } from "@mui/material";
import React from "react";
const CategoryFilterRate = () => {
    const [valueFiveStar] = React.useState(5);
    const [valueFourStar] = React.useState(4);
    const [valueThreeStar] = React.useState(3);
    const [valueTwoStar] = React.useState(2);
    const [valueOneStar] = React.useState(1);
    return (
        <Box sx={{ padding: "25px 0px" }}>
            <Divider />
            <Box padding="10px 0px ">
                <h3>Rate</h3>
                <Grid item>
                    <Tooltip disableHoverListener>
                        <Button>
                            <Rating value={valueFiveStar} readOnly />
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip disableHoverListener>
                        <Button>
                            <Rating value={valueFourStar} readOnly />
                            <Box
                                sx={{ paddingLeft: "10px", paddingTop: "3px" }}
                            >
                                Up
                            </Box>
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip disableHoverListener>
                        <Button>
                            <Rating value={valueThreeStar} readOnly />
                            <Box
                                sx={{ paddingLeft: "10px", paddingTop: "3px" }}
                            >
                                Up
                            </Box>
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip disableHoverListener>
                        <Button>
                            <Rating value={valueTwoStar} readOnly />
                            <Box
                                sx={{ paddingLeft: "10px", paddingTop: "3px" }}
                            >
                                Up
                            </Box>
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip disableHoverListener>
                        <Button>
                            <Rating value={valueOneStar} readOnly />
                            <Box
                                sx={{ paddingLeft: "10px", paddingTop: "3px" }}
                            >
                                Up
                            </Box>
                        </Button>
                    </Tooltip>
                </Grid>
            </Box>
        </Box>
    );
};

export default CategoryFilterRate;
