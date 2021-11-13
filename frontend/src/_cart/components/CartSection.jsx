import { Box, Typography, Stack } from '@mui/material';
import { makeStyles } from "@mui/styles";
import VoucherCard from './VoucherCard';

const coupons = [
  {
    id: 1,
    title: "50% for new user!!",
    remaining: 2,
    valid: "Until 31/12/2021",
    claimed: false,
  },
  {
    id: 2,
    title: "50% for new user!!",
    remaining: 10,
    valid: "Until 31/12/2021",
    claimed: true,
  },
  {
    id: 3,
    title: "50% for new user!!",
    remaining: 5,
    valid: "Until 31/12/2021",
    claimed: false,
  },
];

function CartSection() {
    const classes = useStyles();

    return <Box sx={{ width: '88%', marginBottom: '4.5rem'}}>
        <Box className={classes.header}>Shopping Cart</Box>
        <Stack direction="row" gap={15}>
          <Box sx={{width: '70%', background: 'red'}}>left</Box>
          <Box sx={{width: '30%'}}>
            <Stack sx={{width: "100%"}} gap={1}>
              {coupons.map((coupon,idx) => <VoucherCard key={idx} 
                totalCoupon={5}
                coupon={coupon}
                claimProps={{
                    title: 'Apply',
                    onClick: () => {},
                    style: {width: '5vw'}
                }} 
              />)}
            </Stack>
          </Box>
        </Stack>
    </Box>
}


const useStyles = makeStyles({
    header: {
      display: "flex",
      justifyContent: "start",
      fontSize: "35px",
      fontWeight: 600,
      marginTop: '4.5rem',
      marginBottom: '4.5rem'
    },
    textFieldBox: {
      backgroundColor: "white",
      borderRadius: "10px",
      [`& fieldset`]: {
        borderRadius: "10px",
      },
      display: "flex",
      justifyContent: "center",
      width: "500px",
      marginBottom: "40px",
    },
    button: {
      marginBottom: "20px",
      marginTop: "15px",
    },
    textOrange2: {
      color: "#FD6637",
    },
    text: {
      color: "#A0A3BD",
      display: "flex",
      justifyContent: "flex-end",
      width: "500px",
    },
    condition2: {
      margin: "20px 0",
    },
    divider: {
      color: "#A0A3BD",
      margin: "30px 0px",
    },
  });

export default CartSection
