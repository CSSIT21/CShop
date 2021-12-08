import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Button from '@mui/material/Button';

const Coupon = ({ coupon }) => {
  const classes = useStyles();

  return (
    <Box className={classes.couponbox}>
      <Box className={classes.box}> 

      <Box sx={{ display:"flex"
        }}>
        <img src={coupon.pic} alt="pic"  style={{height:"130px", width:"130px",borderRadius:"10px"}}/>
        <Box className={classes.text}  sx={{
          borderRight: 1.5  , borderRightColor: 'white' , borderRightStyle: 'dashed', borderHeight: 20
        }}>
          <Box className={classes.text1}>{coupon.title}</Box>
          <Box className={classes.text3}>{coupon.detail}</Box>
          <Box className={classes.text4}>{coupon.valid}</Box>
        </Box>
        </Box>

        <Button variant="secondary"  className={classes.button} sx={{
          backgroundColor:'white', color:'#FD6637',
          '&:hover': {
            backgroundColor: '#ffab91', color:'white' , 
        }}}>detail</Button>
      </Box>
    </Box>
  );
};
const useStyles = makeStyles({
  couponbox: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FD6637",
    marginTop : "20px",
    marginBottom: "20px",
    alignItems: "center",
    padding: "12px",
    borderRadius: "20px",
    width: "610px",
    justifyContent: "space-between",
  },

 button:  {
   backgroundColor:"white",
    height: "30px",
    alignSelf:"center",
 },
 box: {
    marginBottom: "30px",
    height: "100px",
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    marginTop:"8px",
    marginLeft: "15px",
    marginRight: "30px",
    width:"300px",
    height:"120px"
  },
  text1: {
    color: "white",
    fontSize: "20px",
    fontWeight: "800px"
  },
  text3: {
    fontSize: "12px",
    color: "white"
  },
  text4: {
    color: "black",
    fontWeight: "200px",
  },
});
export default Coupon;