import { Box } from "@mui/system";
import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import CategoryPic1 from "~/common/assets/images/category-1.png";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ImageIcon from "@mui/icons-material/Image";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import IconButton from "@mui/material/IconButton";
import { nanoid } from "nanoid";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const CarouselBanner = ({
  section = {
    id: "0",
    page: {
      type: 1,
      id: 1,
      content: { img: CategoryPic1 },
    },
  },
  order = 0,
  ...rest
}) => {
  const originSectionImages = [
    {
      id: nanoid(),
    },
  ];
  const [sectionImages, setSectionImages] = useState(originSectionImages);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const addImage = () => {
    if (sectionImages.length < 5)
      setSectionImages([...sectionImages, { id: nanoid() }]);
  };

  const deleteImage = (id) => {
    console.log(id);
    console.log(sectionImages);
    setSectionImages(sectionImages.filter((s, index) => id !== s.id));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          padding: "70px",
          backgroundColor: "#FDF4DD",
          borderRadius: "20px",
        }}
        {...rest}
      >
        <Typography
          component="span"
          color="#000000"
          fontSize="24px"
          fontWeight={600}
        >
          Banner#{order}
        </Typography>
        <Box
          sx={{
            position: "relative",
            "&:hover img": {
              opacity: "0.5",
            },
            "&:hover .MuiSvgIcon-root": {
              opacity: "1",
            },
            "& .MuiSvgIcon-root": {
              opacity: "0",
            },
          }}
        >
          <ImageIcon
            style={{
              width: "50px",
              height: "50px",
              top: "50%",
              left: "50%",
              position: "absolute",
              transform: "translate(50%, -50%)",
            }}
          />
          <img
            onClick={handleClickOpen}
            src={section.page.content.img}
            alt={section.page.type}
            width="100%"
            style={{
              transition: "0.25s all ease-in-out",
            }}
          />
          <Box className={classes.nextIcon} sx={{ right: "10px", top: "50%" }}>
            <ChevronRightIcon style={{ color: "#323232", opacity: "1" }} />
          </Box>
          <Box className={classes.nextIcon} sx={{ left: "10", top: "50%" }}>
            <ChevronLeftIcon style={{ color: "#323232", opacity: "1" }} />
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          {"Add Banner Carousel"}
        </DialogTitle>

        <Box
          sx={{
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          {sectionImages.map((image, idx) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "10px 0",
              }}
              key={image.id}
            >
              <Typography
                component="span"
                color="#000000"
                fontWeight={400}
                sx={{ marginRight: "5px" }}
              >
                #{idx + 1}
              </Typography>
              <TextField type="file" sx={{ color: "#FD6637" }} />
              <IconButton
                aria-expanded={open ? "true" : undefined}
                onClick={() => deleteImage(image.id)}
                disabled={sectionImages.length == 1}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </Box>
          ))}
          <Box sx={{ width: "100%" }}>
            <Button
              onClick={() => addImage()}
              variant="outlined"
              size="large"
              sx={{ width: "100%" }}
              disabled={sectionImages.length == 5}
            >
              +
            </Button>
          </Box>
        </Box>

        <DialogActions>
          <Button onClick={handleClose} sx={{ width: "100px" }} variant="text">
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            sx={{ width: "100px" }}
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
const useStyles = makeStyles({
  nextIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    height: "50px",
    backgroundColor: "#FFFFFF",
    borderRadius: "50%",
    position: "absolute",
  },
});
export default CarouselBanner;
