import React, {useState} from 'react'
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/system" 
import Typography from '@mui/material/Typography';
import CarouselButton from '~/common/components/CarouselButton';

const coupons = [
    {
        id: 1,
      title: "50% save for new user!!",
      remaining: "",
      valid: "Until 31/12/2021",
    },
    {
        id: 2,
        title: "50% save for new user!!",
        remaining: "",
        valid: "Until 31/12/2021",
    },
    {
        id: 3,
        title: "50% save for new user!!",
        remaining: "",
        valid: "Until 31/12/2021",
    },
  ];
  
const Voucher = () => {
    const classes = useStyles();
	const [page, setPage] = useState(0);
    const couponsPerRow = 2;
    const totalPage = Math.ceil(coupons.length / couponsPerRow);

    return (
        <>  
            <Box className={classes.header}> 
                <Typography sx={{fontSize:"24px", fontWeight:"600", color:"#FD6637"}}>Shop Voucher</Typography>
                <CarouselButton pageHandle={setPage} currentPage={page} totalPage={totalPage} />
            </Box>
        </>
    )
}

const useStyles = makeStyles({
    header: {
      display: "flex",
      justifyContent:"space-between",
      alignItems: 'center',
    }
});

export default Voucher
