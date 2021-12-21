import React, { Component } from 'react'
import { Box } from "@mui/system";
import axios from 'axios'
import Script from "react-load-script";
import { Button } from '@mui/material';

let OmiseCard;

export class Banking extends Component {
    handleLoadScript = () => {
        OmiseCard = window.OmiseCard;
        OmiseCard.configure({
          publicKey: "pkey_test_5psl6horexch2cdvb8q",
          currency: "thb",
          frameLabel: "CShop",
          submitLabel: "PAY NOW",
          buttonLabel: "Pay with Omise"
        });
      };
    
      internetBankingConfigure = () => {
        OmiseCard.configure({
          defaultPaymentMethod: "internet_banking",
          otherPaymentMethods: []
        });
        OmiseCard.configureButton("#internet-banking");
        OmiseCard.attach();
      };
    
      omiseCardHandler = () => {
        const { order, createInternetBankingCharge} = this.props;
        OmiseCard.open({
          frameDescription: "Invoice #3847",
          amount: order.total_price,
          onCreateTokenSuccess: token => {
            createInternetBankingCharge(order.id, order.total_price, token)
          },
          onFormClosed: () => {}
        });
      };
    
      handleClick = e => {
        e.preventDefault();
        this.internetBankingConfigure();
        this.omiseCardHandler();
      };
      render() {
        return (
          <Box className="own-form">
            <Script
              url="https://cdn.omise.co/omise.js"
              onLoad={this.handleLoadScript}
            />
            <form>
              <Button
                id="internet-banking"
                className="internet-banking"
                type="button"
                // disabled={this.props.cart.amount === 0}
                onClick={this.handleClick}
              >
                Pay with Internet Banking
              </Button>
            </form>
          </Box>
        );
      }
    }

export default Banking;
