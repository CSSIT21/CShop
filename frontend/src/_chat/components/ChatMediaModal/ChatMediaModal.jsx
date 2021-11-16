import React from "react";
import { Box } from "@mui/system";

import useStyles from "./ChatMediaModal.styles";
import { Modal, Button, Typography } from "@mui/material";
import ImageModal from "../ImageModal/ImageModal";

const ChatMediaModal = (props) => {
  const classes = useStyles();

  return <Modal message_id={props.message_id}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description" open={true}
  >
    <ImageModal src="https://picsum.photos/500/700?id=1"/>
  </Modal>;
  
  
};

export default ChatMediaModal;
