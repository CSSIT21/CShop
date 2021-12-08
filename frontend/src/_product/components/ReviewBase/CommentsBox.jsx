import { useState } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddPhotoAlternateRounded from "@mui/icons-material/AddPhotoAlternateRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const Input = styled("input")({
  display: "none",
});

const UploadButtonStyle = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: "9px",
  width: "56px",
  height: "56px",
  marginRight: "5px",
  borderRadius: "6px",
  border: "1px dashed #CCCCCC",
  backgroundColor: "#FFFFFF",
  color: "#CCCCCC",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    border: "1px dashed #A0A3BD",
    boxShadow: "none",
    backgroundColor: "#FFFFFF",
    color: "#A0A3BD",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#FFFFFF",
  },
  "&:focus": {
    boxShadow: "none",
  },
});

function CommentsBox({ value, setValue, handleChange }) {
  const [imageList, setImageList] = useState(itemData);

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

  return (
    <Box sx={{ width: "100%", height: "100px", marginTop: "20px" }}>
      <Typography fontSize="18px" fontWeight="500">
        Review
      </Typography>
      <Box
        sx={{
          margin: "10px 0",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        {imageList.map((item) => (
          <Box sx={imageBox} key={item.id}>
            <img
              src={item.path}
              alt={item.id}
              loading="lazy"
              style={imgStyle}
            />
            <DeleteRoundedIcon
              style={{
                top: "50%",
                left: "50%",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                transition: "0.25s all ease-in-out",
                cursor: "pointer",
              }}
              onClick={() => deleteImage(item.id)}
            />
          </Box>
        ))}
        {/* Check number of image */}
        {imageList.length >= 12 ? (
          <></>
        ) : (
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={onUploadFile}
            />
            <UploadButtonStyle variant="contained" component="span">
              <AddPhotoAlternateRounded />
              {imageList.length} / 12
            </UploadButtonStyle>
          </label>
        )}
      </Box>
      <Box>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          fullWidth
          defaultValue="No comment"
          value={value}
          placeholder="Write your product review"
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "end",
          margin: "12px 0",
          color: "#A0A3BD",
        }}
      >
        {/* ทำ check length เพิ่ม */}
        <Typography fontSize="14px">{value.length} / 120</Typography>
      </Box>
    </Box>
  );
}
const imageBox = {
  width: "56px",
  height: "56px",
  marginRight: "5px",
  borderRadius: "6px",
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
};
const imgStyle = {
  top: "50%",
  left: "50%",
  width: "100%",
  height: "100%",
  position: "absolute",
  borderRadius: "6px",
  transform: "translate(-50%, -50%)",
  overflow: "visible",
};
const itemData = [
  {
    path: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    id: 5435,
  },
  {
    path: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    id: 6546,
  },
  {
    path: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    id: 6546546,
  },
  {
    path: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    id: 654677,
  },
  {
    path: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    id: 7657,
  },
  {
    path: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    id: 7687,
  },
  {
    path: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    id: 98989,
  },
  {
    path: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    id: 897,
  },
  {
    path: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    id: 987,
  },
];
export default CommentsBox;
