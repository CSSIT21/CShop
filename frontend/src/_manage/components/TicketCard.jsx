import React from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import { Collapse } from "@mui/material";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardLayout } from "./UserCardStyled";
import { Avatar } from "@mui/material";
import { grey, lightBlue, amber } from '@mui/material/colors';
import { withStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormGroup } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Select } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';

export class TicketCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
    this.open = false;
    this.status = {
      value: 'open'
    };
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
    this.props.addRestriction(this.props.ticket.id, this.type, this.desc, this.editDate.day+'/'+this.editDate.month+'/'+this.editDate.year);
    this.forceUpdate();
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
    this.type.value = event.target.value;
  }

  changeStatus = (event) => {
    this.status = event.target.value;
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
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.ticket.type}</Typography>
            </Box>
            <Box sx={{ width: '11%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.ticket.filer}</Typography>
            </Box>
            <Box sx={{ width: '11%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.ticket.target}</Typography>
            </Box>
            <Box sx={{ width: '11%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.ticket.filedDate}</Typography>
            </Box>
            <Box sx={{ width: '11%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.ticket.assignee}</Typography>
            </Box>
            <Box sx={{ width: '11%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}> 
              <div style={{ display:'flex', justifyContent:'center' }}>
              { this.props.ticket.status === 'Open' ?
                  <Card variant="outlined" style={{
                    backgroundColor: "#F4AF5433",
                    border: 'none',
                    width: '75%'}}>
                  <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#D28C40'}}>{this.props.ticket.status}</Typography>
                  </Card> :
                  <Card variant="outlined" style={{
                    backgroundColor: "#B3E24B33",
                    border: 'none',
                    width: '75%'}}>
                  <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#5B8125'}}>{this.props.ticket.status}</Typography>
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
                  <Typography style={{ fontSize: '15px', margin:'25px'}}>{this.props.ticket.desc}</Typography>
                  </Box>
                </Card>
              </Box>
              <Box>
              </Box>
              <Box sx={{display:'flex', flexDirection: 'column', margin:'25px'}}>
                <Box>
                  <Box>
                    <Button variant="contained" size="large" sx={{margin:"10px"}}>Take Ticket</Button>
                  </Box>
                  <Box>
                    <Button size="large" sx={{margin:"10px"}}>Return Ticket</Button>
                  </Box>
                  <Box>
                    <FormControl sx={{ m: 1 }} sx={{margin:"10px"}}>
                        <Select
                          id="status"
                          defaultValue={this.status.value}
                          className={classes.root}
                          onChange={this.changeStatus}
                        >
                          <MenuItem value={'open'}>Open</MenuItem>
                          <MenuItem value={'prog'}>In Progress</MenuItem>
                          <MenuItem value={'closed'}>Closed</MenuItem>
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