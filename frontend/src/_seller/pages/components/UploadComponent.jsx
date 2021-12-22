import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Avatar, Typography, Modal, Input } from "@mui/material";

import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getUrl } from "~/common/utils";
const UploadComponent = () => {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const uploadFile = async (e) => {
    if (e.target.files.length) {
      const path = URL.createObjectURL(e.target.files[0]);
      console.log(e.target.files[0].name);
      setPath(path);
      setTitle(e.target.files[0].name);
      setFile(e.target.files[0]);
      //   setimgFile(path)
      //   setSellerInfo({
      //     ...sellerInfo,
      //     shopImage: {
      //       path: path,
      //       title: e.target.files[0].name,
      //       file: e.target.files[0],
      //     },
      //   });
    }
  };

  const TestUpload = async () => {
    try {
      let url = {
        success: true,
        original_link:
          "https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-store.png",
      };
      if (file) {
        url = await getUrl(file);
        console.log(url);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    TestUpload();
  }, [file]);

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Avatar
            // src={sellerInfo.shopImage.path}
            alt="avatar"
            variant="square"
            sx={{ width: "150px", height: "150px", marginRight: "30px" }}
          ></Avatar>
          <label htmlFor={`outlined-button-file-`}>
            <Button
              component="span"
              variant="outlined"
              sx={{ height: "42px", borderWidth: "2px" }}
            >
              <input
                accept="image/*"
                type="file"
                style={{ display: "none" }}
                id={`outlined-button-file-`}
                onChange={(e) => {
                  uploadFile(e);
                }}
              />
              Upload file
            </Button>
          </label>
          {/* <Button
            component="span"
            variant="outlined"
            sx={{ height: "42px", borderWidth: "2px" }}
            onClick={TestUpload}
          >
            Go
          </Button> */}
        </Box>
      </Box>
    </>
  );
};

export default UploadComponent;
