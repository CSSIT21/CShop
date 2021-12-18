import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";
import DeliveryProgress from "./DeliveryProgress";
import TimelineDot from "./TimelineDot";
import TrackingNumber from "./TrackingNumber";
import TrackingSearch from "./TrackingSearch";

const InputBox = () => {
    const classes = useStyles();

    const [deliveryStatus, setDeliveryStatus] = useState(null);

    return (
        <Box className={classes.inputBox} sx={{ boxShadow: 3 }}>
            <Box>
                <TrackingSearch setDelivery={setDeliveryStatus} />
                {deliveryStatus && deliveryStatus.trackingNumber.length > 0 ? (
                    <Box>
                        <DeliveryProgress status={deliveryStatus.status} />
                        <TrackingNumber
                            trackingNumber={deliveryStatus.trackingNumber}
                        />
                        {deliveryStatus?.details.length > 1 ? (
                            deliveryStatus?.details
                                .map((el, idx) => {
                                    if (idx === 0) {
                                        return (
                                            <TimelineDot
                                                position={-1}
                                                time={el.date}
                                                detail={el.description}
                                            />
                                        );
                                    } else if (
                                        idx ===
                                        deliveryStatus.details.length - 1
                                    ) {
                                        return (
                                            <TimelineDot
                                                position={1}
                                                time={el.date}
                                                detail={el.description}
                                            />
                                        );
                                    } else {
                                        return (
                                            <TimelineDot
                                                position={0}
                                                time={el.date}
                                                detail={el.description}
                                            />
                                        );
                                    }
                                })
                                .reverse()
                        ) : (
                            <TimelineDot
                                position={1}
                                time={deliveryStatus?.details[0].date}
                                detail={deliveryStatus?.details[0].description}
                                size={1}
                            />
                        )}
                    </Box>
                ) : null}
            </Box>
        </Box>
    );
};

const useStyles = makeStyles(() => ({
    inputBox: {
        backgroundColor: "white",
        width: "800px",
        height: "auto",
        borderRadius: "15px",
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "calc((100vh - 292px) /2)",
        marginBottom: "80px",
    },
}));

export default InputBox;
