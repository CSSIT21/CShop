import { makeStyles } from "@mui/styles";
import { Divider, Typography, Avatar, CardMedia, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import CancelIcon from '@mui/icons-material/CancelRounded';
import axios from "axios";
import products from "../../common/faker/fakeProducts";
import {useRecoilState} from 'recoil'
import {amountQuery} from "../recoil/chageamount"


function ProductCartCard({ product, setProduct=void(0),userID }) {
    const classes = useStyles();
    const [_,changeamount] = useRecoilState(amountQuery)

    function remove(){
      console.log(product.orderID)
      axios.post("http://localhost:8080/cart/removefromcart",{orderID: product.orderID,userID:userID,productID:product.id}).then(item=>{
        setProduct(products => {
          products[products.indexOf(product)] = false;
          return products.filter(p => p);
      });
      }).catch(err=>console.log(err));
    }
    

  

    return (
      <Stack direction="row" gap={2} sx={{background: 'white', padding: '15px', borderRadius: '18px'}}>
        <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{
                    width: '128px',
                    aspectRatio: '1',
                    borderRadius: "15px",
                }}
            />
        <Stack sx={{
            display: 'flex',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '50%',
            overflow: 'hidden',
        }} gap={2}>
            <Typography sx={{...expireStyle, color: "#A0A3BD"}}>ITEM# {product.id}</Typography>
            <Typography sx={titleStyle}> {product.title} </Typography>
        </Stack>
      
        <Box sx={{width: '10%', alignItems: 'center', display: 'flex'}}>
            <TextField 
                variant="outlined"
                sx={{ borderRadius: "10px"}}
                type="number"
                value={product.amount}
                inputProps={{ min: 1, sx: { backgroundColor: 'white'}}}
                size="small"
                onChange={e => {setProduct(products => {
                    products[products.indexOf(product)].amount = e.target.value;
                    return [...products];
                });
                changeamount({id:product.orderID,amount: parseInt(e.target.value) })
              }}
            />
        </Box>
        <Box sx={{width: '30%'}}>
            <Stack direction="column" gap={2}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <CancelIcon sx={{color:"#D9DBE9", cursor: 'pointer'}} onClick={remove}/>
            </Box>
                <Typography sx={{...expireStyle, color: "#A0A3BD", textAlign: 'right'}}>{product.amount} x {product.price} BAHT </Typography>

                <Typography sx={{...titleStyle,color: "#FD6637",textAlign: 'right'}} > {product.amount * +product.price} BAHT</Typography>
            </Stack>
        </Box>
      </Stack>
    );
}

const useStyles = makeStyles({
  cartbox: {
    margin: '0px auto',
    maxWidth: "100%",
    width: '100%',
    padding: "15px",

    display: "flex",
    alignItems: "center",

    borderRadius: "15px",
    backgroundColor: "white",
  },
});

const titleStyle = {
  fontSize: "22px",
  fontWeight: 600,
  color: "black",
  
};

const remainStyle = {
  fontSize: "12px",
  fontWeight: 500,
  width: '100%'
};

const expireStyle = {
  fontSize: "15px",
  fontWeight: 500,
  color: "#FD6637",
  width: '100%'
};

export default ProductCartCard
