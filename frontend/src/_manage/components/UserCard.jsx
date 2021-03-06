import { Component } from "react";
import { Card, TextField } from "@mui/material";
import { CardContent } from "@mui/material";
import { Collapse } from "@mui/material";
import { Typography } from "@mui/material";
import config from '../../common/constants';
import { CardLayout } from "./UserCardStyled";
import { Avatar } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Grid } from "@mui/material";
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

export class UserCard extends Component {
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
    this.address = {address_line: 'PENDING', postal_code: 'PENDING'};
    this.types = [];
    this.path = '';
    this.reports = 'PENDING';
  }

  async componentDidMount(){
    let fetchedData3 = {}
    const fetchedData = await axios.get(
      config.SERVER_URL + "/manageaccount/address?id=" + this.props.user.id
    );
    const fetchedData2 = await axios.get(
        config.SERVER_URL + "/manageaccount/suspension/types"
    );
    if(this.props.user.customer_picture != null){
    fetchedData3 = await axios.get(
        config.SERVER_URL + "/manageaccount/users/picture?id=" + this.props.user.customer_picture.customer_id
    );
    }
    const fetchedData4 = await axios.get(
        config.SERVER_URL + "/manageaccount/users/reported?id=" + this.props.user.id
    )
    this.address = fetchedData.data;
    this.types = fetchedData2.data;
    if(fetchedData3 != null){
    this.path = fetchedData3.data.path;
    }
    this.reports = fetchedData4.data.length;
    this.forceUpdate();
  }

  handleExpandClick = () => {
    this.setState({ expand: !this.state.expand });
  };

  update = () => {
    this.forceUpdate();
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
    //this.props.addRestriction(this.props.user.id, this.type, this.desc, this.editDate.day+'/'+this.editDate.month+'/'+this.editDate.year);

    if(this.props.user.admin_customer_suspensions == null){
      const res = await axios.post(
          config.SERVER_URL + "/manageaccount/suspension/users/create",
        {
          "customer_id": this.props.user.id,
          "description": this.desc,
          "picture_id": 0,
          "suspension_type_id": parseInt(this.type),
          "admin_id": this.props.auth.user.id,
          "day": this.editDate.day+1,
          "month": this.editDate.month-1,
          "year": this.editDate.year
        }
      );

      await axios.post(
          config.SERVER_URL + "/manageaccount/audit/create?id=" + this.props.auth.user.id + "&log=" + 'Suspened ' + this.props.user.customer_info.firstname + " " + this.props.user.customer_info.lastname
      );
    }
    else{
      const res = await axios.post(
          config.SERVER_URL + "/manageaccount/suspension/users/update",
        {
          "id": this.props.user.id,
          "description": this.desc,
          "picture_id": 0,
          "suspension_type_id": parseInt(this.type),
          "admin_id": this.props.auth.user.id,
          "day": this.editDate.day+1,
          "month": this.editDate.month-1,
          "year": this.editDate.year
        }
      );

      await axios.post(
          config.SERVER_URL + "/manageaccount/audit/create?id=" + this.props.auth.user.id + "&log=" + 'Updated suspension of ' + this.props.user.customer_info.firstname + " " + this.props.user.customer_info.lastname
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

  changeType = (event) => {
    this.type = event.target.value;
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
              <Avatar alt={this.props.avatarInitials} src={this.path} sx={{ width: 60, height: 60 }}/>
            </Box>
            <Box sx={{ width: '17%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{(this.props.user.customer_info.firstname + " " + this.props.user.customer_info.lastname)}</Typography>
              <Typography noWrap style={{ fontSize: '15px'}}>#{this.props.user.id}</Typography>
            </Box>
            <Box sx={{ width: '20%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px'}}>{this.address.address_line}</Typography>
            </Box>
            <Box sx={{ width: '8%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.user.customer_info.gender}</Typography>
            </Box>
            <Box sx={{ width: '9.5%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.address.postal_code}</Typography>
            </Box>
            <Box sx={{ width: '13%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.user.date.slice(0, 10)}</Typography>
            </Box>
            <Box sx={{ width: '13%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.user.customer_info.birthdate.slice(0, 10)}</Typography>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}> 
              <div style={{ display:'flex', justifyContent:'center' }}>
              { this.props.user.admin_customer_suspensions != null ?
              <Card variant="outlined" style={{
                    backgroundColor: "#E04A4A33",
                    border: 'none',
                    width: '75%'}}>
                <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#812525'}}>Restricted</Typography>
              </Card> :
              <Card variant="outlined" style={{
                backgroundColor: "#B3E24B33",
                border: 'none',
                width: '75%'}}>
                <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#5B8125'}}>Active</Typography>
              </Card>
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
              this.props.user.admin_customer_suspensions == null ?
              <Button onClick={this.dialogClickOpen} variant="contained" sx={{ height:'50%', margin:'12px' }}>Add</Button>:
              <Button onClick={this.dialogClickOpen} variant="contained" sx={{ height:'50%', margin:'12px' }}>Update</Button>
            }
            <Typography noWrap style={{ fontWeight: 600, fontSize: '15px', margin:'20px'}}>Report Count: {this.reports}</Typography>
          </CardContent>
          <CardContent>
            {
              this.props.user.admin_customer_suspensions == null ?
              <div></div>:
              <RestrictionCard res={this.props.user.admin_customer_suspensions} deleteRestriction={this.props.deleteRestriction} objid={this.props.user.id} update={() => this.update()}/>
            }
          </CardContent>
        </Collapse>
      <Dialog open={this.open} onClose={this.dialogClose} maxWidth='md' fullWidth={true} align="center">
        <DialogTitle color="primary" style={{ fontWeight: 600, fontSize: '36px', margin:'25px' }}>ADD RESTRICTION</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{width:'20%', marginLeft:'-64%'}} style={{ fontWeight: 600, fontSize: '17px'}}>
            Restriction Type
          </DialogContentText>
          <Box sx={{width:'90%'}}>
          <TextField
                id="type"
                variant="outlined"
                sx={textField}
                select
                defaultValue={495}
                onChange={this.changeType}
              >
                {this.types.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.title}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
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



export default withStyles(styles, { withTheme: true })(UserCard);