import React, { useState, useMemo } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import ReviewDialogContents from "./ReviewDialogContents";
import CButton from "~/common/components/CButton";
import ConfirmDialogs from "~/common/components/ConfirmDialogs";

function ReviewDialog({
  // img = "https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg",
  img = "https://offautan-uc1.azureedge.net/-/media/images/off/ph/products-en/products-landing/landing/off_overtime_product_collections_large_2x.jpg?la=en-ph",
  productName = "Product Name",
  productId,
  // options,
  // choices,
  options = ["Black", " Pink", " Red", "Black", " Pink", " Red"],
  choices = ["XL", "L", "M", "XL", "L", "M"],
  statusOrder = true,
}) {
  const [open, setOpen] = useState(false);
  const [openThankYouDialog, setOpenThankYouDialog] = useState(false);
  const [commentProductText, setCommentProductText] = useState("");
  const [commentShopText, setCommentShopText] = useState("");
  const [chipData, setChipData] = useState([
    { key: 0, label: "Good Quality", clicked: false },
    { key: 1, label: "Worth Buying", clicked: false },
    { key: 2, label: "Fast Shipping", clicked: false },
    { key: 3, label: "Good Shop Services", clicked: false },
    { key: 4, label: "Good Ship Services", clicked: false },
  ]);
  const [imageList, setImageList] = useState([]);
  const [starScore, setStarScore] = React.useState(0);

  const onUploadFile = (e) => {
    if (e.target.files.length) {
      const path = URL.createObjectURL(e.target.files[0]);

      setImageList((imageList) => {
        imageList.push({
          id: imageList.length + 1,
          path: path,
        });

        return [...imageList];
      });

      e.target.value = null;
    }
  };

  const deleteImage = (e) => {
    setImageList(imageList.filter((item) => item.id !== e));
    console.log(e + " : This image is deleted");
  };
  const submitable = useMemo(() => {
    let chipCheck = false;
    let imageCheck = false;
    let commentCheck = false;
    let scoreCheck = false;
    let allCheck = false;
    chipData.forEach((el) => {
      if (el.clicked) chipCheck = true;
    });
    imageList.forEach((el) => {
      if (imageList) imageCheck = true;
    });
    if (commentProductText) commentCheck = true;
    if (starScore != 0) scoreCheck = true;
    if (chipCheck || imageCheck || commentCheck || scoreCheck) allCheck = true;
    return allCheck;
  }, [chipData, imageList, commentProductText, starScore]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseThankYouDialog = () => {
    setOpenThankYouDialog(false);
  };
  const handleClickOpenThankYouDialog = () => {
    setOpenThankYouDialog(true);
    setOpen(false);
  };

  const handleChangeCommentProduct = (e) => {
    setCommentProductText(e.target.value.slice(0, 500));
  };
  const handleChangeCommentShop = (e) => {
    setCommentShopText(e.target.value.slice(0, 500));
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        disabled={!statusOrder}
      >
        Review
      </Button>

      <BootstrapDialog
        maxWidth="xl"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{ color: "#FD6637", fontSize: "24px", fontWeight: "600" }}
        >
          {"Product Review"}
        </DialogTitle>
        <DialogContent sx={{ width: "1000px", height: "500px" }}>
          <ReviewDialogContents
            img={img}
            productName={[productName]}
            options={options}
            choices={choices}
            generatedCommentsData={chipData}
            setChipData={setChipData}
            commentProduct={commentProductText}
            setCommentProduct={setCommentProductText}
            commentShop={commentShopText}
            setCommentShop={setCommentShopText}
            handleChangeCommentProduct={handleChangeCommentProduct}
            handleChangeCommentShop={handleChangeCommentShop}
            imageList={imageList}
            setImageList={setImageList}
            onUploadFile={onUploadFile}
            deleteImage={deleteImage}
            starScore={starScore}
            setStarScore={setStarScore}
          />
        </DialogContent>
        <DialogActions>
          <CButton
            title="Cancel"
            width="100px"
            height="39px"
            onClick={handleClose}
            backgroundColor="white"
            style={{ color: "#A0A3BD" }}
          />
          <CButton
            title="Confirm"
            width="100px"
            height="39px"
            onClick={handleClickOpenThankYouDialog}
            sx={{ marginLeft: "16px" }}
            disabled={!submitable}
          />
          <ConfirmDialogs
            text="Your review has been sent"
            open={openThankYouDialog}
            handleClose={handleCloseThankYouDialog}
          />
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    padding: "25px 45px 8px 45px",
  },
  "& .MuiDialogContent-root": {
    padding: "25px 45px",
  },
  "& .MuiDialogActions-root": {
    padding: "20px 45px 25px 45px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ReviewDialog;
