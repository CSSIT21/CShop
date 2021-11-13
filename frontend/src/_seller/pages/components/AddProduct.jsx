import {useState} from "react";
import { Button, Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AddProduct({product = false, setProduct = () => {},title = "",description = ""}) {
    const ProductAdd = () => setProduct(true);
    const ProduceClose = () => setProduct(false);
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    return (
      <Dialog open ={product} onClose={ProduceClose}>
      <DialogTitle sx={{
            alignSelf: "center",
          }}>
              Add new product
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{
            alignSelf: "center"
          }}> 
          Enter your Add Stock and click save
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Shop name"
          type="email"
          fullWidth
          variant="standard"
        />
       <TextField
        id="standard-multiline-static"
        label="Description"
        multiline 
        fullWidth
        rows={5}
        variant="standard"
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={ProduceClose}>Cancel</Button>
        <Button onClick={ProduceClose}>Save</Button>
      </DialogActions>
    </Dialog>
    );
  }