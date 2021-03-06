import { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Stack, TextField, MenuItem } from '@mui/material';
import { makeStyles } from "@mui/styles";
import config from '../../common/constants';
import products from '../../common/faker/fakeProducts';
import VoucherCard from './VoucherCard';
import ProductCartCard from './ProductCartCard';
import CButton from "~/common/components/CButton";
import {useRecoilState} from 'recoil'
import {amountQuery} from "../recoil/chageamount"
import axios from 'axios';
import { useHistory } from 'react-router-dom'


const coupons = [
  {
    id: 1,
    title: "50% for new user",
    remaining: 2,
    valid: "Until 31/12/2021",
    claimed: false,
    type: 'normal',
    limit: 1000,
    min: 1,
    value: 0.5
  },
  {
    id: 2,
    title: "25% after buy 200B. UP",
    remaining: 10,
    valid: "Until 31/12/2021",
    claimed: true,
    type: 'conditional',
    limit: 1500,
    min: 1000,
    value: 0.25
  },
  {
    id: 3,
    title: "50% for new user!!",
    remaining: 5,
    valid: "Until 31/12/2021",
    claimed: false,
    type: 'conditional',
    limit: 1000,
    min: 250,
    value: 0.5
  },
];

const addresses = [{
  id: 0,
  title: 'Primary Address',
  phone: '098-378-2018'
}, {
  id: 1,
  title: '69/3 Koh Kwang Sub-district, Muang District, Chanthaburi 22000',
  phone: '099-999-9999'
}];

const MyCartItems = products.map(product => ({...product, amount: 1}));

function CartSection({ allProduct,setProduct,discounts,accountInfo}) {
    const [amount,changeamount] = useRecoilState(amountQuery)
    const [address, setAddress] = useState(0);
    MyCartItems.length = 5;
    const [MyCart, setmyCart] = useState(allProduct);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    // const phone = useMemo(() => addresses.find(v => v.id === address).phone ,[address]);
    const totalCost = useMemo(() => MyCart.reduce((prev,product) => prev + (+product.price) * product.amount,0), [MyCart]);
    const discount = useMemo(() => calculateDiscount(totalCost, selectedCoupon));
    const classes = useStyles();
    const [phoneNumber, setPhoneNumber] = useState(accountInfo.phone_number);
    const [addressInfo, setAddressInfo] = useState([]);
    const [activeID, setActiveID] = useState('');
    const router = useHistory()
  




    useEffect(() => {
      setmyCart(allProduct)
    }, [allProduct])

    
    useEffect(() => {
      setAddressInfo(accountInfo.map(item => { 
        const add = item.address_id_from_customer_address
        return ({
          id: item.address_id,
          title: add.address_line +" "+ add.sub_district +" "+ add.district +" "+ add.province +" "+ add.postal_code,
          phone: add.phone_number
        });
      }))

      accountInfo.forEach(item => {
        if (item.primary) { 
          setActiveID(item.address_id)
          setPhoneNumber(item.address_id_from_customer_address.phone_number)
        }
      });
    },[accountInfo])
  
    function calculateDiscount(total,coupon){
      if(coupon == null) return 0;
      // if(coupon.type === 'nornal'){
      // }else if(coupon.type === 'conditional'){
      // }
      if(total * coupon.value > coupon.limit) return coupon.limit;
      if(total < coupon.min) return 0;
      return total * coupon.value;
    }
    
    function removeAll(e){
      e.preventDefault();
      axios.post( config.SERVER_URL + "/cart/removeallfromcart",{userID:accountInfo[0].customer_id}).then(item=>setProduct([]));
    }

    function confirmOrder(){
      axios.post( config.SERVER_URL + "/cart/updateamount",{updateAmount:amount,addressID:activeID,userID:accountInfo[0].customer_id,totalprice:totalCost-discount}).then(item=>router.push(`/payment?orderId=${item.data.id}${selectedCoupon ? "&cuponId="+selectedCoupon.id : ""}&addressId=${activeID}`))
      
    }

    return <Box sx={{ width: '88%', marginBottom: '4.5rem'}}>
        <Box className={classes.header}>Shopping Cart</Box>
        <Stack direction="row" gap={15}>
        <Stack sx={{ width: '70%' }} direction="column" gap={2}>
          <Stack direction="row" gap={5}>
            <TextField
              id="address"
              variant="outlined"
              sx={{ borderRadius: "10px", width: "70%" }}
              fullWidth
              inputProps={{ sx: { background: 'white', fontWeight: 600}}}
              select
              value={activeID}
              onChange={e => {
                setActiveID(e.target.value)
                setAddress(e.target.value)
                addressInfo.forEach((item,idx) => {
                  if(item.id === e.target.value){
                    setPhoneNumber(item.phone)
                  }
                  
                  })
              }}
            >
              { addressInfo.map( address => <MenuItem value={address.id} key={address.id}>
                  {address.title}
                </MenuItem>)
              }
            </TextField >
            <TextField
              id="month"
              variant="outlined"
              placeholder="Phone Number"
              sx={{ borderRadius: "10px",width: "30%" }}
              inputProps={{ sx: { borderRadius: "10px",background: 'white', fontWeight: 600}}}
              fullWidth
              value={phoneNumber || ''} onChange={(e) => (setPhoneNumber(e.target.value))}
            >
                
            </TextField>
          </Stack>
          <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', marginBottom: '0.5rem', paddingLeft: '15px', paddingRight: '15px'}}>
              <Box sx={{display: 'flex'}}>{MyCart.length} Product{ MyCart.length > 1 ? 's' : ''} </Box>
              <Box sx={{display: 'flex'}}><a href="/cart" onClick={removeAll} style={{color: '#A0A3BD'}}>Remove All</a></Box>
          </Box>
          <Stack direction="column" gap={2}>
            {/* {MyCart.map(product => <ProductCartCard setProduct={setProduct} product={product} key={product.id} />)} */}
            {allProduct.map(product => <ProductCartCard userID={accountInfo[0]?.customer_id} setProduct={setProduct} product={product} key={product.id} />)}
          </Stack>
          </Stack>
          <Box sx={{width: '30%'}}> 
            <Stack direction="column" gap={5}>
              <Stack direction="column" gap={5} sx={{borderRadius: "15px", backgroundColor: "white", padding: "20px"}}>
                {/* <Stack sx={{display: 'flex', color: 'black', fontWeight: '500', }}>Total</Stack> */}
                <Box sx={{display: 'flex', justifyContent: 'space-between',fontSize: "24px", fontWeight: '500'}}>
                  <Box sx={{display: 'flex', color: 'black' }}>Total</Box>
                  <Box sx={{display: 'flex', color: "#FD6637",}}>{totalCost - discount} BAHT</Box>
                </Box>
                <CButton width="100%" height="54px" title="Comfirm" onClick={confirmOrder} size="large" sx={{'& p': {fontSize: '18px'}}}/>
              </Stack>
            <Box sx={{
              display: 'flex', justifyContent: 'space-between', borderRadius: "15px", backgroundColor: "white", padding: "15px", marginBottom: '5rem', fontSize: "20px"}}>
                <Box sx={{display: 'flex', color: 'black', fontWeight: '500', }}>Discount</Box>
                <Box sx={{display: 'flex', color: discount > 0 ? '#FD3737' : '#C4C4C4'}}>{ discount > 0 ? '-' : ''}{discount} BAHT</Box>
              </Box>
            </Stack>
            <Stack sx={{width: "100%"}} gap={1}>
              {discounts.map((coupon,idx) => {
                return(<VoucherCard key={idx} 
                totalCoupon={5}
                coupon={coupon}
                selectedCoupon={selectedCoupon}
                setSelectedCoupon={setSelectedCoupon}
                totalCost={totalCost}
                claimProps={
                  {title: (totalCost > coupon.min ? "Apply" : "cannot Apply"), 
                  backgroundColor: (totalCost > coupon.min ? "#FD6637" : "gray"), 
                  onClick: (totalCost > coupon.min ? () => setSelectedCoupon({...coupon}) : ()=>{}) ,
                  style: {width: '5vw'}}
                  // {title: 'Apply', onClick: () => setSelectedCoupon(null),style: {width: '5vw'}}  
              } 
              />)})}
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
