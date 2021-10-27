import { Typography, Button } from "@mui/material";
import AddressInfo from "../components/AddressBase/AddressInfo";
import TopProfile from "../components/TopProfile";
import AccordionCommon from "~/common/components/AccordionCommon";
import AddressForm from "../components/AddressBase/AddressForm";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Box } from "@mui/system";
import ConfirmDialogs from "~/common/components/ConfirmDialogs";

const provinces = ["Bangkok", "Mixko", "Chonburi", "Hat Yai"];
const districts = ["Thung Kru", "Sathorn", "Bang Khun Tian", "Phayatha"];
const subdistricts = ["Bang Mod", "Bang Rak", "Mixko", "Samphathawong"];

const AddressPage = () => {
  const classes = useStyles();
  const [openShopping, setopenShopping] = useState(true);
  const [open, setOpen] = useState(false);
  return (
    <>
      <ConfirmDialogs
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        text="Your information has been saved"
      />
      <TopProfile />
      <Box className={classes.body}>
        <Box className={classes.container}>
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: "600",
              margin: "72px auto",
            }}
          >
            Address Management
          </Typography>
          <AccordionCommon
            title="Add New Address"
            subTitle="Please check the correct address and phone number registration
            for accurate and fast delivery"
            open={openShopping}
            setOpen={setopenShopping}
          >
            <AddressForm title="Recipient's Name" />
            <AddressForm title="Address" />
            <AddressForm title="Province" select data={provinces}></AddressForm>
            <AddressForm title="District" select data={districts}></AddressForm>
            <AddressForm
              title="Sub District"
              select
              data={subdistricts}
            ></AddressForm>
            <AddressForm title="Postal Code" readOnly />
            <AddressForm title="Phone Number" />
            <Box className={classes.buttonGroup}>
              <Button
                className={classes.button}
                variant="contained"
                sx={{
                  height: "45px",
                  textTransform: "capitalize",
                  fontSize: "16px",
                }}
                onClick={() => setOpen(true)}
              >
                Add
              </Button>
              <Button
                className={classes.button}
                sx={{
                  marginLeft: "24px",
                  height: "45px",
                  textTransform: "capitalize",
                  fontSize: "16px",
                }}
                variant="outlined"
              >
                Cancel
              </Button>
            </Box>
          </AccordionCommon>
          <AddressInfo />
        </Box>
      </Box>
    </>
  );
};
const useStyles = makeStyles({
  body: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
  },
  buttonGroup: {
    margin: "56px 0",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    width: "100px",
  },
});

export default AddressPage;
