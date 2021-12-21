import React from 'react'
import { Avatar, Box, DialogContent, DialogTitle, Divider, IconButton, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import Carousel from "../../../common/components/Carousel";


const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle  sx={{ m: 1, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: -16,
            top: 8,
            transform: "translate(-50%, 100%)",
            color: "#FD6637",
            zIndex: 1,
            backgroundColor: "#ffffff",

            boxShadow: " 0px 1px 3px 0px rgba(128,128,128,0.75)",

            "&:hover": {
              backgroundColor: "#dddddd",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function DialogImage({handleCloseDialog,openDialog,photo, page,setPage}) {
    return (
        <>
         {/* Dialog */}
          <Dialog
            onClose={handleCloseDialog}
            aria-labelledby="customized-dialog-title"
            open={openDialog}
            PaperComponent={Box}
            sx={{ objectFit: "contain" }}
          >
            <Box sx={{ position: "relative" }}>
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleCloseDialog}
              ></BootstrapDialogTitle>
              <Carousel
                items={photo}
                pageState={page}
                setPageState={setPage}
                itemsPerRow={1}
                hideArrow={false}
              >
                {(item, idx) => (
                  <Box>
                    <DialogContent>
                      <Box>
                        <img
                          src={item.path}
                          alt={idx}
                          style={{ width: "100%", maxWidth: "60vw" }}
                        />
                      </Box>
                    </DialogContent>
                  </Box>
                )}
              </Carousel>
            </Box>
          </Dialog>   
        </>
    )
}

export default DialogImage
