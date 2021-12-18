import React from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Collapse } from "@mui/material";
import { Typography } from "@mui/material";
import { CardLayout } from "./UserCardStyled";
import { Avatar } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RestrictionCard from "../components/RestrictionCard";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import axios from "axios";
import {
  months,
  days,
} from "../../common/constants/register";
import { years } from "../common/future";

export class SellerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
    this.open = false;
    this.editDate = {
      day: '1',
      month: '1',
      year: '2021'
    };
    this.type = 495;
    this.desc = 'Pending Description';
  }

  handleExpandClick = () => {
    this.setState({ expand: !this.state.expand });
  };

  update = () => {
    this.forceUpdate()
  };

  dialogClickOpen = () => {
    this.open = true;
    this.forceUpdate();
  };

  dialogClose = () => {
    this.open = false;
    this.forceUpdate();
  };

  addRes = async () => {
    
    if(this.props.seller.admin_shop_suspensions == null){
      const res = await axios.post(
        "http://localhost:8080/manageaccount/suspension/sellers/create",
        {
          "shop_id": this.props.seller.id,
          "description": this.desc,
          "picture_id": 0,
          "suspension_type_id": parseInt(this.type),
          "admin_id": 100,
          "day": this.editDate.day+1,
          "month": this.editDate.month-1,
          "year": this.editDate.year
        }
      );
    }
    else{
      const res = await axios.post(
        "http://localhost:8080/manageaccount/suspension/sellers/update",
        {
          "id": this.props.seller.id,
          "description": this.desc,
          "picture_id": 0,
          "suspension_type_id": parseInt(this.type),
          "admin_id": 100,
          "day": this.editDate.day+1,
          "month": this.editDate.month-1,
          "year": this.editDate.year
        }
      );
    }
    
    document.location.reload();
    this.dialogClose();
  };

  changeDay = (event) => {
    this.editDate.day = event.target.value;
  }

  changeMonth = (event) => {
    this.editDate.month = event.target.value;
  }

  changeYear = (event) => {
    this.editDate.year = event.target.value;
  }

  changeDesc = (event) => {
    this.desc = event.target.value;
  }

  changeType = (event) => {
    this.type = event.target.value;
  }

  render() {
    const { classes } = this.props;

    return (
      <CardLayout elevation={0}>
        <CardContent>
          <Box className={classes.header}>
            <Box sx={{ width: '7%' }} className={classes.header}>
              <Avatar alt={this.props.avatarInitials} src={this.props.path} sx={{ width: 60, height: 60 }}/>
            </Box>
            <Box sx={{ width: '17%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography noWrap style={{ fontSize: '15px'}}>#{this.props.seller.id}</Typography>
            </Box>
            <Box sx={{ width: '20%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
            <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{this.props.seller.shop_name}</Typography>
            </Box>
            <Box sx={{ width: '8%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.seller.productCount}</Typography>
            </Box>
            <Box sx={{ width: '9.5%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.seller.followers}</Typography>
            </Box>
            <Box sx={{ width: '13%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.seller.cancelRate}</Typography>
            </Box>
            <Box sx={{ width: '13%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.seller.join_date.slice(0, 10)}</Typography>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}> 
              <div style={{ display:'flex', justifyContent:'center' }}>
              { this.props.seller.rating < 2.5 ?
                <Card variant="outlined" style={{
                  backgroundColor: "#E04A4A33",
                  border: 'none',
                  width: '75%'}}>
                <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#812525'}}>{this.props.seller.rating}</Typography>
                </Card> :
                (
                  this.props.seller.rating > 3.5 ?
                  <Card variant="outlined" style={{
                    backgroundColor: "#B3E24B33",
                    border: 'none',
                    width: '75%'}}>
                  <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#5B8125'}}>{this.props.seller.rating}</Typography>
                  </Card> :
                  <Card variant="outlined" style={{
                    backgroundColor: "#F4AF5433",
                    border: 'none',
                    width: '75%'}}>
                  <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#D28C40'}}>{this.props.seller.rating}</Typography>
                  </Card>
                )
              }
              </div>
            </Box>
            <Box sx={{ width: '2%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
            {this.state.expand === true ? 
              <KeyboardArrowUpIcon sx={{ marginLeft: '3px', fontSize: 25}} color="primary" onClick={this.handleExpandClick}/> : 
              <KeyboardArrowDownIcon sx={{ marginLeft: '3px', fontSize: 25}} color="primary" onClick={this.handleExpandClick}/> }
            </Box>
          </Box>
        </CardContent>
        <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
          <CardContent className={classes.header} sx={{ padding:'0px' }}>
            <Typography noWrap style={{ fontWeight: 600, fontSize: '15px', margin:'20px'}}>Restrictions</Typography>
            {
              this.props.seller.admin_shop_suspensions == null ?
              <Button onClick={this.dialogClickOpen} variant="contained" sx={{ height:'50%', margin:'12px' }}>Add</Button>:
              <Button onClick={this.dialogClickOpen} variant="contained" sx={{ height:'50%', margin:'12px' }}>Update</Button>
            }
          </CardContent>
          <CardContent>
            {
              this.props.seller.admin_shop_suspensions == null ?
              <div></div>:
              <RestrictionCard res={this.props.seller.admin_shop_suspensions} deleteRestriction={this.props.deleteRestriction} objid={this.props.seller.id} update={() => this.update()}/>
            }
            </CardContent>
        </Collapse>
        <Dialog open={this.open} onClose={this.dialogClose} maxWidth='md' fullWidth={true} align="center">
        <DialogTitle color="primary" style={{ fontWeight: 600, fontSize: '36px', margin:'25px' }}>ADD RESTRICTION</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{width:'20%', marginLeft:'-64%'}} style={{ fontWeight: 600, fontSize: '17px'}}>
            Restriction Type
          </DialogContentText>
          <TextField
            align="center"
            margin="dense"
            id="type"
            fullWidth
            variant="outlined"
            sx={{width:'80%!important'}}
            onChange={this.changeType}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText sx={{width:'10%', marginLeft:'-70%'}} style={{ fontWeight: 600, fontSize: '17px'}}>
            Description
          </DialogContentText>
          <TextField
            align="center"
            margin="dense"
            id="desc"
            multiline
            fullWidth
            rows={6}
            variant="outlined"
            sx={{width:'80%!important'}}
            onChange={this.changeDesc}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText sx={{width:'20%', marginLeft:'-65%', marginBottom:'14px'}} style={{ fontWeight: 600, fontSize: '17px'}}>
            Restricted Until
          </DialogContentText>
            <Grid container sx={{width:'85%'}}>
              <Grid item xs={4}>
              <Box className={classes.textFieldBox} style={dateTextField}>
                <TextField
                id="day"
                variant="outlined"
                sx={textField}
                select
                label="Day"
                defaultValue={this.editDate.day}
                onChange={this.changeDay}
                >
                {days.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </TextField>
              </Box>
              </Grid>
              <Grid item xs={4}>
              <Box className={classes.textFieldBox} style={dateTextField}>
              <TextField
                id="month"
                variant="outlined"
                sx={textField}
                select
                label="Month"
                defaultValue={this.editDate.month}
                onChange={this.changeMonth}
              >
                {months.map((month) => (
                  <MenuItem key={month.id} value={month.id}>
                    {month.label}
                  </MenuItem>
                ))}
              </TextField>
              </Box>
              </Grid>
              <Grid item xs={4}>
              <Box className={classes.textFieldBox} style={dateTextField}>
              <TextField
                id="year"
                variant="outlined"
                sx={textField}
                select
                label="Year"
                defaultValue={this.editDate.year}
                onChange={this.changeYear}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
                </TextField>
              </Box>
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.dialogClose} size="large" sx={{margin:"10px"}}>Cancel</Button>
          <Button variant="contained" onClick={this.addRes} size="large" sx={{margin:"10px"}}>Confirm</Button>
        </DialogActions>
      </Dialog>
      </CardLayout>
    );
  }
}

const styles = theme => ({
  header: {
    display:'flex',
    flexDirection: 'row',
  }
});

const textField = {
  borderRadius: "10px",
  width: "90%",
};
const dateTextField = {
  width: "90%",
};

export default withStyles(styles, { withTheme: true })(SellerCard);