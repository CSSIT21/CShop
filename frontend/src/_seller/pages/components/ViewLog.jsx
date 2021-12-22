import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Avatar, Typography, Modal, Input } from "@mui/material";
import Button from "@mui/material/Button";
import PageHeader from "./PageHeader";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

import config from "~/common/constants";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ViewLogBody from "./TableContent/ViewLogBody";
import LoadingComponent from "./LoadingComponent";

const ViewLog = () => {
  const shopid = useParams();
  const shopint = shopid.id;
  const Pagename = "Customer Visited";

  const columns = [
    { id: "id", label: "id" },
    { id: "firstname", label: "firstname" },
    {
      id: "lastname",
      label: "lastname",
      align: "right",
    },
    {
      id: "gender",
      label: "gender",
      align: "right",
    },
    {
      id: "view_date",
      label: "view_date",
      align: "right",
    },
    // firstname,
    // lastname,
    // gender,
    // view_date,
  ];

  return (
    <>
  
      <Box>
        <Box sx={{ mt: "4rem" }} />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <PageHeader Pagename={Pagename} />
        </Box>

        <Box sx={{ mt: "3rem" }} />

        <ViewLogBody columns={columns} />
      </Box>
    </>
  );
};

export default ViewLog;
