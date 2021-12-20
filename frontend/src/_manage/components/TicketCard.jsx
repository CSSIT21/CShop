import React from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Collapse } from "@mui/material";
import { Typography } from "@mui/material";
import { CardLayout } from "./UserCardStyled";
import { withStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SupportMedia from "../components/SupportMedia";
import axios from "axios";

export class TicketCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
    this.open = false;
    this.status = this.props.ticket.admin_support_status.status;
    this.filer = {firstname: 'PENDING', lastname: ''};
    this.admin = {firstname: 'PENDING', lastname: ''};
    this.type = {title:'PENDING'};
    this.path = '';
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

  addRes = () => {
    this.props.addRestriction(this.props.ticket.id, this.type_title, this.description, this.editDate.day+'/'+this.editDate.month+'/'+this.editDate.year);
    this.forceUpdate();
    this.dialogClose();
  };

  changeAdmin = async () => {
    const res = await axios.post(
      "http://localhost:8080/manageaccount/tickets/update/admin",
      {
        "id": this.props.ticket.id,
        "status": '',
        "admin_id": this.props.auth.user.id
      }
    );

    document.location.reload();
  }

  returnAdmin = async () => {
    const res = await axios.post(
      "http://localhost:8080/manageaccount/tickets/update/admin",
      {
        "id": this.props.ticket.id,
        "status": '',
        "admin_id": 1111
      }
    );

    document.location.reload();
  }

  changeStatus = async (event) => { 
    this.status.status = event.target.value;

    if(this.props.ticket.admin_support_status != null){
      const res = await axios.post(
        "http://localhost:8080/manageaccount/tickets/update/status",
        {
          "id": this.props.ticket.id,
          "status": event.target.value,
          "admin_id": 999
        }
      );
    }
    
    document.location.reload();
    this.dialogClose();
  }

  async componentDidMount(){

    const fetchedData = await axios.get(
      "http://localhost:8080/manageaccount/users/id?id=" + this.props.ticket.customer_id
    );
    const fetchedData3 = await axios.get(
      "http://localhost:8080/manageaccount/users/id?id=" + this.props.ticket.admin_id
    );
    const fetchedData2 = await axios.get(
      "http://localhost:8080/manageaccount/tickets/type?id=" + this.props.ticket.support_type_id
    );
    const fetchedData4 = await axios.get(
      "http://localhost:8080/manageaccount/tickets/picture?id=" + this.props.ticket.picture_id
    );

    this.filer = fetchedData.data.customer_info;
    this.type = fetchedData2.data;
    this.admin = fetchedData3.data.customer_info;

    console.log(fetchedData.data)

    if(fetchedData4.data.length > 0){
      this.path = fetchedData4.data[0];
    }

    this.forceUpdate();
  }

  render() {
    const { classes } = this.props;

    return (
      <CardLayout elevation={0}>
        <CardContent>
          <Box className={classes.header}>
            <Box sx={{ width: '30%', overflow: "hidden", textOverflow: "ellipsis", display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography noWrap style={{ fontWeight: 600, fontSize: '15px', wordWrap: 'break-word', lineClamp: 1}}>{this.props.ticket.title}</Typography>
            </Box>
            <Box sx={{ width: '11%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.type.title}</Typography>
            </Box>
            <Box sx={{ width: '11%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.filer.firstname + " " + this.filer.lastname}</Typography>
            </Box>
            <Box sx={{ width: '11%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.ticket.target}</Typography>
            </Box>
            <Box sx={{ width: '11%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.ticket.sent_date.slice(0, 10)}</Typography>
            </Box>
            <Box sx={{ width: '11%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.admin.firstname + " " + this.admin.lastname}</Typography>
            </Box>
            <Box sx={{ width: '11%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}> 
              <div style={{ display:'flex', justifyContent:'center' }}>
              { (this.status.status === 'Open' || this.status.status === 'In Progress') ?
                  <Card variant="outlined" style={{
                    backgroundColor: "#F4AF5433",
                    border: 'none',
                    width: '75%'}}>
                  <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#D28C40'}}>{this.status.status}</Typography>
                  </Card> :
                  <Card variant="outlined" style={{
                    backgroundColor: "#B3E24B33",
                    border: 'none',
                    width: '75%'}}>
                  <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#5B8125'}}>{this.status.status}</Typography>
                  </Card>
              }
              </div>
            </Box>
            <Box sx={{ width: '5%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
            {this.state.expand === true ? 
              <KeyboardArrowUpIcon sx={{ marginLeft: '3px', fontSize: 25}} color="primary" onClick={this.handleExpandClick}/> : 
              <KeyboardArrowDownIcon sx={{ marginLeft: '3px', fontSize: 25}} color="primary" onClick={this.handleExpandClick}/> }
            </Box>
          </Box>
        </CardContent>
        <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
          <Card variant="outlined" style={{
            backgroundColor: "#FFEDE7",
            border: 'none',
            marginBottom: '20px'}}>
            <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Box style={{width: '50%', margin: '15px'}}>
                <Typography style={{ fontWeight: 600, fontSize: '15px'}}>Description</Typography>
                <Card variant="outlined" style={{
                backgroundColor: "#FFFFFF",
                border: 'none',
                margin: '10px'}}>
                  <Box sx={{ display:'flex', flexDirection: 'column', justifyContent: 'left' }}>  
                  <Typography style={{ fontSize: '15px', margin:'25px'}}>{this.props.ticket.description}</Typography>
                  </Box>
                </Card>
              </Box>
              <Box>
              </Box>

              <Box sx={{width:'25%', display:'flex', flexDirection: 'column', justifyContent: 'center', margin:'16px'}}>
                <SupportMedia image={this.path.path} title={this.path.title} />
              </Box>

              <Box sx={{display:'flex', flexDirection: 'column', margin:'25px'}}>
                <Box>
                  <Box>
                    <Button variant="contained" size="large" sx={{margin:"10px"}} onClick={this.changeAdmin}>Take Ticket</Button>
                  </Box>
                  <Box>
                    <Button size="large" sx={{margin:"10px"}} onClick={this.returnAdmin}>Return Ticket</Button>
                  </Box>
                  <Box>
                    <InputLabel id="status-label" sx={{ top: '5px', left: '10px' }}>Status</InputLabel>
                    <FormControl sx={{ m: 1 }} sx={{margin:"10px"}}>
                        <Select
                          id="status"
                          labelId="status-label"
                          label="Status"
                          defaultValue={this.status.status}
                          className={classes.root}
                          onChange={this.changeStatus}
                        >
                          <MenuItem value={"Open"}>Open</MenuItem>
                          <MenuItem value={"In Progress"}>In Progress</MenuItem>
                          <MenuItem value={"Closed"}>Closed</MenuItem>
                        </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </Collapse>
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

export default withStyles(styles, { withTheme: true })(TicketCard);