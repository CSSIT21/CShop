import { Box, typography } from '@mui/system'
import LazyImage from '../../common/components/LazyImage/LazyImage'
import { CheckCircleOutline, RadioButtonUnchecked,  } from '@mui/icons-material'
import { Checkbox, Divider, FormControlLabel, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, {useState, useEffect} from 'react'
import CreditCardIcon from '../assets/images/mc_vrt_pos.svg'
import VisaCardIcon from '../assets/images/Visa_2021.svg'
import CButton from '../../common/components/CButton'
import axios from "axios" 


const getData = () => {
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
  
//    useEffect(() => {
//     getData();
//    }, [])

   const [nameOnCard, setNameOnCard] = useState("")
const CreditCard = () => {
    const classes = useStyles();
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
          <TextField type="text" fullWidth placeholder="1111-2222-3333-4444" />
        </Box>
        <Box className={classes.expAndSecurityBox} marginBottom={2}>
          <Box>
            <Typography>Exp date</Typography>
            <TextField type="text" placeholder="September" />
          </Box>
          <Box className={classes.securityBox}>
            <Typography>Security code</Typography>
            <TextField type="text" placeholder="123" />
          </Box>
        </Box>
        
        <CButton title="complete transaction" />

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
      display: "flex",
      justifyContent: "center",
      margin: "70px 0 180px 0",
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
    },
  });
}
export default CreditCard;
