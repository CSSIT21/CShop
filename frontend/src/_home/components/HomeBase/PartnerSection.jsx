import { useState, useEffect } from 'react';
import { Box } from "@mui/system"
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import HeaderWithIcon from '../commonBase/HeaderWithIcon';
import PartnerList from "../commonBase/PartnerList";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import axios from "axios";
import Swal from 'sweetalert2';
import config from "~/common/constants";

const PartnerSection = () => {
    const [delivery, setDelivery] = useState([]);
    const [payment, setPayment] = useState([]);
    const classes = useStyles();

    const getData = () => {
		axios
			.get(`${config.SERVER_URL}/partners`)
			.then(({data}) => {
				if (data.success) {
                    let deliveryTemp = [], paymentTemp = [];

					data.partners.forEach(partner => {
                        if (partner.type === 'PaymentMethod') paymentTemp.push(partner);
                        else if (partner.type === 'Delivery') deliveryTemp.push(partner);
                    });

                    setPayment(paymentTemp);
                    setDelivery(deliveryTemp);
				}
				else {
					return console.log(data);
				}
			})
			.catch((err) => {
				return console.log(err.message);
			})
	};

	useEffect(() => {
		getData();
	}, [])

    return (
        <Box className={classes.partnerWrapper}>

            <Box className={classes.partnerElements}>
                <PartnerList title="Payment Method" items={payment} />
            </Box>

            <Box className={classes.partnerElements}>
                <PartnerList title="Delivery Services" items={delivery} />
            </Box>

            <Box className={classes.partnerElements}>
                <Typography
                    component="h6"
                    fontSize="14px"
                    fontWeight={500}
                    color="#A0A3BD"
                    mb={4}
                >
                    Contact Us
                </Typography>

                <Box>
                    <HeaderWithIcon
                        ItemIcon={LocalPhoneIcon}
                        title="Tel: 000-123-456"
                        {...contactProps}
                    />

                    <a href="mailto:cshop@mail.kmutt.ac.th">
                        <HeaderWithIcon
                            ItemIcon={EmailIcon}
                            title="Email: cshop@mail.kmutt.ac.th"
                            {...contactProps}
                        />
                    </a>

                    <a href="https://www.facebook.com/SIT.Family">
                        <HeaderWithIcon
                            ItemIcon={FacebookIcon}
                            title="Facebook: Cshop2021"
                            {...contactProps}
                        />
                    </a>
                </Box>
            </Box>
        </Box>
    );
};

const useStyles = makeStyles({
    partnerWrapper: {
        width: "100%",
        boxSizing: "border-box",
        padding: "100px",
        display: "flex",
        gap: "100px",
        justifyContent: "space-evenly",
    },

    partnerElements: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
});
const contactProps = {
    fontSize: "14px",
    fontWeight: 500,
    color: "#978D8D",
    marginBottom: 4,
};

export default PartnerSection;
