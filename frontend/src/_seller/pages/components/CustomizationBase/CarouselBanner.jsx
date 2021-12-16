import { Box } from "@mui/system";
import React, { useState, useLayoutEffect } from "react";
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
import { noop, convertFileBase64 } from "~/common/utils";

const CarouselBanner = ({
  id = "0",
  contents = [
    {
      title: "placeholder",
      id: 1,
      img: "https://cloudfour.com/wp-content/uploads/2020/01/default.svg",
    },
  ],

  information,
  setInformation = noop,
  order = 0,
  ...rest
}) => {
  const [sectionImages, setSectionImages] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useLayoutEffect(() => {
    if (id in information) {
      setSectionImages(information[id].content);
    } else {
      console.log("image not found");
    }
  }, []);

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

  const uploadFile = async (e) => {
    if (e.target.files.length) {
      const path = URL.createObjectURL(e.target.files[0]);
      const title = e.target.files[0].name;
      const imagesetter = {
        id: nanoid(),
        path: path,
        title: title,
        file: e.target.files[0],
      };
      setSectionImages((sectionImages) => {
        sectionImages.push(imagesetter);
        return [...sectionImages];
      });

      e.target.value = null;
      console.log(sectionImages);
    }
  };

  const saveUpload = () => {
    setInformation((info) => ({
      ...info,
      [id]: { ...info[id], content: sectionImages },
    }));
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
              transform: "translate(-50%, -50%)",
            }}
          />
          {sectionImages.length === 0 ? (
            <img
              onClick={handleClickOpen}
              src={contents[0].img}
              alt={contents[0].title}
              width="100%"
              style={{
                transition: "0.25s all ease-in-out",
              }}
            />
          ) : (
            <img
              onClick={handleClickOpen}
              src={sectionImages[0].path}
              alt={sectionImages[0].title}
              width="100%"
              style={{
                transition: "0.25s all ease-in-out",
              }}
            />
          )}

          <Box
            className={classes.nextIcon}
            sx={{
              right: "10px",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <ChevronRightIcon style={{ color: "#323232", opacity: "1" }} />
          </Box>
          <Box
            className={classes.nextIcon}
            sx={{
              left: "10px",
              top: "50%",
              transform: "translate(50%, -50%)",
            }}
          >
            <ChevronLeftIcon style={{ color: "#323232", opacity: "1" }} />
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: "center", color: "#FD6637" }}>
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
                justifyContent: "center",
                margin: "10px 0",
              }}
              key={image.id}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  width: "400px",
                  height: "auto",
                }}
              >
                <Typography
                  component="span"
                  color="#000000"
                  fontWeight={400}
                  sx={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                  }}
                >
                  #{idx + 1}
                </Typography>
                <img
                  src={image.path}
                  alt="image"
                  style={{
                    width: "100%",
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    padding: "0",
                  }}
                  aria-expanded={open ? "true" : undefined}
                  onClick={() => deleteImage(image.id)}
                >
                  <DeleteRoundedIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          ></Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <label
            htmlFor={
              sectionImages.length >= 5 ? "text" : `outlined-button-file-${id}`
            }
          >
            <Button
              component="span"
              variant="outlined"
              disabled={sectionImages.length >= 5}
              sx={{ height: "42px", borderWidth: "2px" }}
            >
              <input
                accept="image/*"
                type="file"
                style={{ display: "none" }}
                id={`outlined-button-file-${id}`}
                onChange={(e) => {
                  uploadFile(e, id);
                }}
              />
              Upload
            </Button>
          </label>
          <Box>
            <Button
              onClick={handleClose}
              sx={{ width: "100px" }}
              variant="text"
            >
              Cancel
            </Button>
            <Button
              onClick={saveUpload}
              sx={{ width: "100px" }}
              variant="contained"
            >
              Confirm
            </Button>
          </Box>
        </Box>
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
