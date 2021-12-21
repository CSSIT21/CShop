import React, { Component } from "react";
import { Box } from "@mui/system";
import axios from 'axios'
import { Banking } from "../components/Banking";
import { Typography } from "@mui/material";


export class PayByInternetBanking extends Component {
  state = {
    charge: undefined
  }
  createInternetBankingCharge = async (id, total_price, token) => {
    try {
        const res = await axios({
          method: 'post',
          url: 'http://localhost:8080/payment/internet-banking',
          data: {
            id,
            total_price,
            token
          },
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        console.log(res.data)
        const {authorizeUri} = res.data
        if (authorizeUri) {
          this.props.clearCart()
          window.location.href = authorizeUri
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    render() {
      const { order } = this.props;
      const {charge} = this.state
  
      return (
        <Box className="own-form">
          <Banking
            order={order}
            createInternetBankingCharge={this.createInternetBankingCharge}
          />
          {
            charge &&
            <Box className="message">
              <Typography>Thank you for your payment</Typography>
              <Typography>
                Your payment amount is <span className="amount">{new Intl.NumberFormat().format(charge.amount)} Baht. </span>
                 Status <span className={
                  charge.status === 'successful' ? 'success' : 'failed'
                }>{charge.status}</span>
              </Typography>
            </Box>
          }
        </Box>
      );
    }
  }
export default PayByInternetBanking;
