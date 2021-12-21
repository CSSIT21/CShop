import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>detail</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ลดราคา 20% ขั้นต่ำ 0฿ ลดสูงสุด 500฿
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            มาไวได้ไว รีบใช้ก่อนจะหมด! ลดเฉพาะร้านค้าที่ร่วมรายการกับ CShop เท่านั้น!!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

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
        }}}>
          <BasicModal/>
        </Button>
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