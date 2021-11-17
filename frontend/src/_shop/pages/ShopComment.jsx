import React from "react";
import TabsController from "../components/ShopCommentBase/TabsController";
import Box from "@mui/material/Box";
const commentsList = [
  {
    imageURL: "1",
    username: "patiphon",
    rating: 3,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis laborum debitis neque, ea nemo amet fugiat incidunt laudantium excepturi quidem nulla odit illo iure deleniti quisquam, repudiandae asperiores doloremque aliquam?",
  },
  {
    imageURL: "2",
    username: "Thanawan",
    rating: 3.5,
    comment: "Good :)",
    productDetail: {
      id: 2,
      name: "ยากันยุง",
      variation: "none",
    },
  },
  {
    imageURL: "1",
    username: "Pw-a02",
    rating: 3,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis laborum debitis neque, ea nemo amet fugiat incidunt laudantium excepturi quidem nulla odit illo iure deleniti quisquam, repudiandae asperiores doloremque aliquam?",
  },
  {
    imageURL: "2",
    username: "Thanawan",
    rating: 3.5,
    comment: "Good :)",
  },
  {
    imageURL: "1",
    username: "Pw-a02",
    rating: 3,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis laborum debitis neque, ea nemo amet fugiat incidunt laudantium excepturi quidem nulla odit illo iure deleniti quisquam, repudiandae asperiores doloremque aliquam?",
  },
  {
    imageURL: "2",
    username: "cympati",
    rating: 3.5,
    comment: "Good :)",
  },
  {
    imageURL: "1",
    username: "YOK",
    rating: 3,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis laborum debitis neque, ea nemo amet fugiat incidunt laudantium excepturi quidem nulla odit illo iure deleniti quisquam, repudiandae asperiores doloremque aliquam?",
  },
  {
    imageURL: "2",
    username: "Thanawan",
    rating: 3.5,
    comment: "Good :)",
  },
  {
    imageURL: "1",
    username: "patiphon",
    rating: 3,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis laborum debitis neque, ea nemo amet fugiat incidunt laudantium excepturi quidem nulla odit illo iure deleniti quisquam, repudiandae asperiores doloremque aliquam?",
  },
  {
    imageURL: "2",
    username: "Thanawan",
    rating: 3.5,
    comment: "Good :)",
  },
  {
    imageURL: "1",
    username: "patiphon",
    rating: 3,
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis laborum debitis neque, ea nemo amet fugiat incidunt laudantium excepturi quidem nulla odit illo iure deleniti quisquam, repudiandae asperiores doloremque aliquam?",
  },
  {
    imageURL: "2",
    username: "Thanawan",
    rating: 3.5,
    comment: "Good :)",
  },
  {
    imageURL: "2",
    username: "Thanawan",
    rating: 3.5,
    comment: "Good :)",
  },
  {
    imageURL: "2",
    username: "Thanawan",
    rating: 3.5,
    comment: "Good :)",
  },
  {
    imageURL: "2",
    username: "Thanawan",
    rating: 3.5,
    comment: "Good :)",
  },
  {
    imageURL: "2",
    username: "Thanawan",
    rating: 3.5,
    comment: "Good :)",
  },
];

const productComments = [];

const ShopComment = () => {
  return (
    <Box sx={{ backgroundColor: "#EFEFF1", padding: "50px 100px 0 100px" }}>
      <Box
        sx={{ backgroundColor: "#FFFFFF", borderRadius: "20px 20px 0px 0px" }}
      >
        <TabsController
          productComments={productComments}
          comments={commentsList}
        />
      </Box>
    </Box>
  );
};

export default ShopComment;
