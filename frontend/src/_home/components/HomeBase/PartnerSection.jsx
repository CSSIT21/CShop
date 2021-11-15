import { useState } from 'react';
import { Box } from "@mui/system"
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import HeaderWithIcon from '../commonBase/HeaderWithIcon';
import PartnerList from "../commonBase/PartnerList";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';

const paymentItems = [
    {
        id: 0,
        url: "http://www.carrentcr.com/wp-content/uploads/2016/12/ktb-logo-1024x1024.jpg",
        name: "KrungThai",
    },
    {
        id: 1,
        url: "https://www.sequelonline.com/wp-content/uploads/2021/01/BBL-New-TH-768x768.jpg",
        name: "Bualuang",
    },
    {
        id: 2,
        url: "https://i.pinimg.com/564x/00/24/29/002429e4b28532ce5273cafa10be61c2.jpg",
        name: "Kasikorn",
    },
    {
        id: 3,
        url: "https://pbs.twimg.com/profile_images/924662185929752576/9cRHWYxV_400x400.jpg",
        name: "Scb",
    },
    {
        id: 4,
        url: "https://scontent.fbkk8-2.fna.fbcdn.net/v/t39.30808-6/236882268_4094531223928840_2487522570845278237_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeHgwSerwf9qpYHVvadgSVVPdKG5Mm3Xjsp0obkybdeOyvLPxkV2EKm7dquw5GXBrWo6yYak9FmPxx3n96tgLGgb&_nc_ohc=5-vY-zrVoRcAX8Jlmaf&_nc_ht=scontent.fbkk8-2.fna&oh=4f511d8e7463791b6532245baad0470f&oe=61960806",
        name: "KrungSri",
    },
    {
        id: 5,
        url: "https://assets.brandinside.asia/uploads/2016/12/Mastercard_logo.png",
        name: "Mastercard",
    },
];

const deliveryItems = [
    {
        id: 0,
        url: "https://logos-world.net/wp-content/uploads/2020/08/DHL-Logo.png",
        name: "DHL Express",
    },
    {
        id: 1,
        url: "https://mpics.mgronline.com/pics/Images/563000005657301.JPEG",
        name: "Flash Express",
    },
    {
        id: 2,
        url: "https://1.bp.blogspot.com/-eQmKyZetUfw/XmoKGW3jwDI/AAAAAAAAI0U/Srqx2aqMrooOftK9Yjx9a7gyrpl7q56MwCNcBGAsYHQ/s1600/2020-03-12%2B17_08_06-Window.png",
        name: "Grab Express",
    },
    {
        id: 3,
        url: "https://i1.wp.com/www.9tana.com/wp-content/uploads/2018/09/kerry.jpg?fit=620%2C326&ssl=1&resize=1280%2C720",
        name: "Kerry Express",
    },
    {
        id: 4,
        url: "https://i.ytimg.com/vi/g8dmXtBQvDM/maxresdefault.jpg",
        name: "J&T Express",
    },
    {
        id: 5,
        url: "https://file.thailandpost.com/upload/content/logothp_576cab0fedfee.jpg",
        name: "THAILAND POST",
    },
]

const contactProps = {
    fontSize: "14px",
    fontWeight: 500,
    color: "#978D8D",
    marginBottom: 4,
};

const PartnerSection = () => {
    const [pItems] = useState(paymentItems);
    const [dItems] = useState(deliveryItems);

    const classes = useStyles();

    return (
        <Box className={classes.partnerWrapper}>

            <Box className={classes.partnerElements}>
                <PartnerList title="Payment Method" items={pItems} />
            </Box>

            <Box className={classes.partnerElements}>
                <PartnerList title="Delivery Services" items={dItems} />
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

export default PartnerSection;
