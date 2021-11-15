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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';

export class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
  }

  handleExpandClick = () => {
    this.setState({ expand: !this.state.expand });
  };

  render() {
    const { classes } = this.props;

    return (
      <CardLayout elevation={0}>
        <CardContent>
          <Box className={classes.header}>
            <Box sx={{ width: '7%' }} className={classes.header}>
              <Avatar sx={{ bgcolor: this.props.user.avatarColor, width: 60, height: 60 }}>{this.props.user.avatarInitials}</Avatar>
            </Box>
            <Box sx={{ width: '17%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{this.props.user.name}</Typography>
              <Typography noWrap style={{ fontSize: '15px'}}>#{this.props.user.id}</Typography>
            </Box>
            <Box sx={{ width: '20%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px'}}>{this.props.user.address}</Typography>
            </Box>
            <Box sx={{ width: '8%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.user.gender}</Typography>
            </Box>
            <Box sx={{ width: '9.5%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.user.postal}</Typography>
            </Box>
            <Box sx={{ width: '13%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.user.joinDate}</Typography>
            </Box>
            <Box sx={{ width: '13%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.user.birthDate}</Typography>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}> 
              <div style={{ display:'flex', justifyContent:'center' }}>
              { this.props.user.status === "Active" ?
              <Card variant="outlined" style={{
                    backgroundColor: "#B3E24B33",
                    border: 'none',
                    width: '75%'}}>
                <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#5B8125'}}>{this.props.user.status}</Typography>
              </Card> :
              <Card variant="outlined" style={{
                backgroundColor: "#E04A4A33",
                border: 'none',
                width: '75%'}}>
            <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#812525'}}>{this.props.user.status}</Typography>
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
            <Typography noWrap style={{ fontWeight: 600, fontSize: '15px', margin:'20px'}}>Restrictions ({this.props.user.restrictions.length})</Typography>
            <Button variant="contained" sx={{ height:'50%', margin:'12px' }}>Add</Button>
          </CardContent>
          <CardContent>
          {this.props.user.restrictions.map((res) => (
                            <div key={res.id.toString()}>
                                <Card variant="outlined" style={{
                                backgroundColor: "#FFEDE7",
                                border: 'none',
                                marginBottom: '15px'}}>
                                  <CardContent className={classes.header} sx={{ padding:'28px' }}>
                                    <Box sx={{ width: '22%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                                      <Typography noWrap style={{ fontSize: '15px', color: '#FD6637'}}>Restriction Type</Typography>
                                      <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{res.type}</Typography>
                                    </Box>
                                    <Box sx={{ width: '15%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                                      <Typography noWrap style={{ fontSize: '15px', color: '#FD6637'}}>Assigner</Typography>
                                      <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{res.assigner}</Typography>
                                    </Box>
                                    <Box sx={{ width: '12%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                                      <Typography noWrap style={{ fontSize: '15px', color: '#FD6637'}}>Start Time</Typography>
                                      <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{res.startTime}</Typography>
                                    </Box>
                                    <Box sx={{ width: '12%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                                      <Typography noWrap style={{ fontSize: '15px', color: '#FD6637'}}>End Time</Typography>
                                      <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{res.endTime}</Typography>
                                    </Box>
                                    <Box sx={{ width: '30%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                                      <Typography style={{ fontSize: '15px', color: '#FD6637'}}>Description</Typography>
                                      <Typography style={{ fontWeight: 600, fontSize: '15px'}}>{res.desc}</Typography>
                                    </Box>
                                    <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center'}}>  
                                      <Button variant="contained" sx={{ width: '50%', marginLeft: '35px'}}><DeleteIcon/></Button>
                                    </Box>
                                  </CardContent>
                                </Card>
                            </div>
                        ))}
          </CardContent>
          <CardContent className={classes.header} sx={{ padding:'0px' }}>
            <Button variant="outlined" sx={{ marginLeft:'30px' }}>Go to Order History</Button>
          </CardContent>
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

export default withStyles(styles, { withTheme: true })(UserCard);