import { Box, typography } from '@mui/system'
import LazyImage from '../../common/components/LazyImage/LazyImage'
import { Checkbox, Divider, FormControlLabel, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useState} from 'react'
import CreditCardIcon from '../assets/images/mc_vrt_pos.svg'
import VisaCardIcon from '../assets/images/Visa_2021.svg'
import CButton from '../../common/components/CButton'
import config from "~/common/constants";
import Axios from 'axios'




//const getData = () => {
//     axios
//      .get(`${config.SERVER_URL}/creditcard`)
//      .then(({data}) => {
//       if (data.success) {
//        return setCreditCard(data.creditcard);
//       }
//       else {
//        return console.log(data);
//       }
//      })
//      .catch((err) => {
//       return console.log(err.message);
//      })
//    };
  
  //  useEffect(() => {
  //   getData();
  //  }, [])



  

const CreditCard = ({ orderId }) => {
  const classes = useStyles();
  const [cardNo, setCardNo] = useState("");
  const [exp, setExp] = useState();
  const [cvc, setCvc] = useState("")

  const onClickHandler = () => {
    confirm();
    window.location.href =`http://localhost:3000/payment/success`
  }

  const confirm = () => {
  
  console.log("Done");
  
    Axios.post(`${config.SERVER_URL}/payment/card`, {
      "cardNo": cardNo,
      "exp": exp,
      "cvc": cvc,
      "orderId": orderId
    }).then((res) => {
    if (res.data.success) {
      console.log(cardNo);
      
      }
  }).catch((err) => console.log(err))
}

    return (
      <Box className={classes.pagestyle}>
        <Box className={classes.header}>Credit card payment</Box>
        <Box className={classes.creditCard}>
          <LazyImage
            className={classes.masterCardIcon}
            src={CreditCardIcon}
            lazy="https://via.placeholder.com/92x60.png"
          />
          <LazyImage
            className={classes.visaIcon}
            src={VisaCardIcon}
            lazy="https://via.placeholder.com/92x60.png"
          />
        </Box>
        <Box marginBottom={2}>
          <Typography>Name on Card</Typography>
          <TextField type="text" fullWidth placeholder="John" />
        </Box>
        <Box marginBottom={2}>
          <Typography>Card number</Typography>
          <TextField type="number" onInput={(e) => { e.target.value = (e.target.value).toString().slice(0, 16) }}
              onChange={(e) => setCardNo(e.target.value)} />
        </Box>
        <Box className={classes.expAndSecurityBox} marginBottom={2}>
          <Box>
            <Typography>Exp date</Typography>
            <TextField type="month" style = {{width: 300}} onChange={(e)=>setExp(new Date(e.target.value).toISOString())} />
          </Box>
          <Box >
            <Typography>Security code</Typography>
            <TextField type="number" style = {{width: 300}} onInput={(e) => { e.target.value = (e.target.value).toString().slice(0, 3) }}
              onChange={(e) => setCvc(e.target.value)} />
          </Box>
        </Box>
        
        <CButton title="complete transaction" onClick={onClickHandler} />

        {/* <Box
                className={classes.textFieldBox}
                style={{ marginLeft: "10px" }}
              >
                <TextField
                  id="lastname"
                  variant="outlined"
                  placeholder="Lastname"
                  value={CardNo}
                  fullWidth
                  error={lnError.length === 0 ? false : true}
                  onChange={(e) => {
                    setCardNo( e.target.value );
                  }}
                /> 
              </Box> */}
      </Box>
    );
}

const useStyles = makeStyles({
    header: {
      display: "flex",
      justifyContent: "center",
      fontSize: "32px",
      fontWeight: 600,
      margin: "5% 0% 0% 0%",
    },
  
    textField: {
      marginBottom: "40px",
      display: "inline-block",
    },
      button: {
      margin: '20px 0 0 35% !important'
    },
    error: {
      fontSize: "14px",
      color: "#FD3737",
      textAlign: "right",
      width: "100%",
      marginTop: "6px",
    },
    pagestyle: {
      width: "40%",
      marginLeft: "30%",
    },
    creditCard: {
      display: "flex",
      flexDirection: "row",
      width: "150px",
    },
    masterCardIcon: {
      display: "flex",
      flexDirection: "row",
      left: "160%",
      height: "100%",
      marginBottom: "50px"
    },
    visaIcon: {
      display: "flex",
      flexDirection: "row",
      left: "160%",
      height: "100%",
    },
    securityBox: {
      marginLeft: "20px"
    },
    expAndSecurityBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: 'space-between'
    },
  });

export default CreditCard;
