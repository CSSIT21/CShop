import React, { useState, useMemo, useEffect } from "react";
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
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { getUrl } from "~/common/utils";
import axios from "axios";
import config from "~/common/constants";
import Swal from "sweetalert2";
// import { useRecoilValue } from "recoil";
// import authState from "../../common/store/authState";

function ReviewDialog({
  productImg = "https://offautan-uc1.azureedge.net/-/media/images/off/ph/products-en/products-landing/landing/off_overtime_product_collections_large_2x.jpg?la=en-ph",
  productName = "Product Name",
  productId = 1,
  shopId = 1,
  customerId = 1,
  // ตัอย่างoptions
  // กรณีที่สินค้ามีoption 2
  // options = [
  //   { firstChoice: "XL", secondChoice: "Pink" },
  //   { firstChoice: "L", secondChoice: "Red" },
  //   { firstChoice: "M", secondChoice: "Green" },
  //   { firstChoice: "XL", secondChoice: "Pink" },
  //   { firstChoice: "L", secondChoice: "Red" },
  //   { firstChoice: "M", secondChoice: "Green" },
  //
  // กรณีที่สินค้ามีoption 1
  // options = [
  //   { firstChoice: "Pink" },
  //   { firstChoice: "Red" },
  //   { firstChoice: "Green" },
  //   { firstChoice: "Pink" },
  //   { firstChoice: "Red" },
  //   { firstChoice: "Green" },
  // ],
  // กรณีที่สินค้าไม่มีoption
  options,
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
  const [starScore, setStarScore] = useState(0);
  const onUploadFile = (e) => {
    if (e.target.files.length) {
      const path = URL.createObjectURL(e.target?.files[0]);

      console.log(e.target?.files[0]);
      setImageList((imageList) => {
        imageList.push({
          id: imageList?.length + 1,
          path: path,
          file: e.target?.files[0],
          title: e.target?.files[0].name,
        });

        return [...imageList];
      });

      e.target.value = null;
    }
  };

  const deleteImage = (e) => {
    setImageList(imageList.filter((item) => item.id !== e));
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
    console.log(chipCheck);
    imageList.forEach((el) => {
      if (imageList) imageCheck = true;
    });
    console.log(imageCheck);
    if (commentProductText) commentCheck = true;
    console.log(commentCheck);
    if (starScore != 0) scoreCheck = true;
    console.log(scoreCheck);
    if (chipCheck || imageCheck || commentCheck || scoreCheck) allCheck = true;
    console.log(allCheck);
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

  const createReview = async () => {
    // if(auth)
    console.log(imageList);
    const pictureList = [];
    for (let i = 0; i < imageList.length; i++) {
      let path = await getUrl(imageList[i].file);
      pictureList.push({
        path: path.original_link,
        thumbnail: "review product picture",
        title: imageList[i].title,
      });
    }

    console.log(pictureList);
    let rating;
    starScore <= 0 ? (rating = 0) : (rating = starScore);
    console.log(rating);
    let concatComment = commentProductText;
    chipData.forEach((e) => {
      if (e.clicked) {
        if (concatComment) {
          concatComment += ", " + e.label;
        } else {
          concatComment += e.label;
        }
      }
    });
    console.log(concatComment);
    axios
      .post(
        `${config.SERVER_URL}/review-product/${productId}/${customerId}/create-product-review`,
        {
          pictureList,
          rating,
          comment: concatComment,
        }
      )
      .then(({ data }) => {
        if (data.success) {
          console.log(data.review);
          commentShopText ? "" : handleClickOpenThankYouDialog();
          //
        }
      })
      .catch((e) => {
        console.log(e.message);
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });

    if (commentShopText) {
      console.log(commentShopText);
      axios
        .post(
          `${config.SERVER_URL}/review-product/${shopId}/${customerId}/create-shop-review`,
          {
            productId,
            rating: 0,
            comment: commentShopText,
          }
        )
        .then(({ data }) => {
          if (data.success) {
            console.log(data.review);
            handleClickOpenThankYouDialog();
          }
        })
        .catch((e) => {
          console.log(e.message);
          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
    handleClickOpenThankYouDialog();
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<CreateRoundedIcon />}
        sx={{
          height: "40px",
          width: "130px",
          textTransform: "capitalize",
          fontSize: "14px",
        }}
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
            img={productImg}
            productName={[productName]}
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
            options={options}
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
            onClick={createReview}
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
