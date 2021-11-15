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
import { grey, lightBlue } from '@mui/material/colors';
import { withStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
    this.restrictions = [
      {id:1, type:'Comment Restriction', assigner:'Admin007', startTime:'10/10/2020', endTime:'17/10/2020', desc:'Rude Comment'},
      {id:2, type:'Transaction Restriction', assigner:'muumel', startTime:'10/10/2020', endTime:'17/10/2020', desc:'Unexpected Chargeback'},
    ];
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
              <Avatar sx={{ bgcolor: grey[400], width: 60, height: 60 }}>BH</Avatar>
            </Box>
            <Box sx={{ width: '17%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>Benjamin Hokma</Typography>
              <Typography noWrap style={{ fontSize: '15px'}}>#24578</Typography>
            </Box>
            <Box sx={{ width: '20%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px'}}>126 Pracha Uthit Rd, Bang Mot,Thung Khru, Bangkok 10140</Typography>
            </Box>
            <Box sx={{ width: '8%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>Male</Typography>
            </Box>
            <Box sx={{ width: '9.5%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>10120</Typography>
            </Box>
            <Box sx={{ width: '13%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>10/10/2020</Typography>
            </Box>
            <Box sx={{ width: '13%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>02/08/2000</Typography>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}> 
              <div style={{ display:'flex', justifyContent:'center' }}>
              <Card variant="outlined" style={{
                    backgroundColor: "#B3E24B33",
                    border: 'none',
                    width: '65%'}}>
                <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#5B8125'}}>Active</Typography>
              </Card>
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
            <Typography noWrap style={{ fontWeight: 600, fontSize: '15px', margin:'20px'}}>Restrictions ({this.restrictions.length})</Typography>
            <Button variant="contained" sx={{ height:'50%', margin:'12px' }}>Add</Button>
          </CardContent>
          <CardContent>
          {this.restrictions.map((id) => (
                            <li key={id.toString()}>
                                <Card variant="outlined" style={{
                                backgroundColor: "#FFEDE7",
                                border: 'none',
                                marginBottom: '15px'}}>
                                  <CardContent className={classes.header} sx={{ padding:'28px' }}>
                                    <Box sx={{ width: '17%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                                      <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>Benjamin Hokma</Typography>
                                      <Typography noWrap style={{ fontSize: '15px'}}>#24578</Typography>
                                    </Box>
                                    <Box sx={{ width: '20%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                                      <Typography style={{ fontSize: '15px'}}>126 Pracha Uthit Rd, Bang Mot,Thung Khru, Bangkok 10140</Typography>
                                    </Box>
                                    <Box sx={{ width: '8%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                                      <Typography style={{ fontSize: '15px', textAlign: 'center'}}>Male</Typography>
                                    </Box>
                                    <Box sx={{ width: '9.5%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                                      <Typography style={{ fontSize: '15px', textAlign: 'center'}}>10120</Typography>
                                    </Box>
                                    <Box sx={{ width: '13%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                                      <Typography style={{ fontSize: '15px', textAlign: 'center'}}>10/10/2020</Typography>
                                    </Box>
                                    <Box sx={{ width: '13%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                                      <Typography style={{ fontSize: '15px', textAlign: 'center'}}>02/08/2000</Typography>
                                    </Box>
                                  </CardContent>
                                </Card>
                            </li>
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