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
    this.type = event.target.value;
  }

  render() {
    const { classes } = this.props;

    return (
      <CardLayout elevation={0}>
        <CardContent>
          <Box className={classes.header}>
            <Box sx={{ width: '30%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
            <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{this.props.ticket.desc}</Typography>
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
                    backgroundColor: "#B3E24B33",
                    border: 'none',
                    width: '75%'}}>
                  <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#5B8125'}}>{this.props.ticket.status}</Typography>
                  </Card> :
                  <Card variant="outlined" style={{
                    backgroundColor: "#F4AF5433",
                    border: 'none',
                    width: '75%'}}>
                  <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#D28C40'}}>{this.props.ticket.status}</Typography>
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
          <Box sx={{ display:'flex', flexDirection: 'column', justifyContent: 'left' }}>  
            <Typography noWrap style={{ fontSize: '15px'}}>{this.props.ticket.desc}</Typography>
            </Box>
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