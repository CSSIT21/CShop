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
    console.log(deliveryStatus);

    return (
        <Box className={classes.inputBox} sx={{ boxShadow: 3 }}>
            <Box>
                <TrackingSearch setDelivery={setDeliveryStatus} />
                {deliveryStatus &&
                deliveryStatus?.detail.tracking_number.length > 0 ? (
                    <Box>
                        <DeliveryProgress
                            status={deliveryStatus?.detail.status}
                        />
                        <TrackingNumber
                            trackingNumber={
                                deliveryStatus?.detail.tracking_number
                            }
                        />
                        {deliveryStatus?.detail.delivery_detail.length > 1 ? (
                            deliveryStatus?.detail.delivery_detail
                                .map((el, idx) => {
                                    if (idx === 0) {
                                        return (
                                            <TimelineDot
                                                position={-1}
                                                time={el.time}
                                                detail={el.detail}
                                            />
                                        );
                                    } else if (
                                        idx ===
                                        deliveryStatus?.detail.delivery_detail
                                            .length -
                                            1
                                    ) {
                                        return (
                                            <TimelineDot
                                                position={1}
                                                time={el.time}
                                                detail={el.detail}
                                            />
                                        );
                                    } else {
                                        return (
                                            <TimelineDot
                                                position={0}
                                                time={el.time}
                                                detail={el.detail}
                                            />
                                        );
                                    }
                                })
                                .reverse()
                        ) : (
                            <TimelineDot
                                position={1}
                                time={
                                    deliveryStatus?.detail.delivery_detail[0]
                                        .time
                                }
                                detail={
                                    deliveryStatus?.detail.delivery_detail[0]
                                        .detail
                                }
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
