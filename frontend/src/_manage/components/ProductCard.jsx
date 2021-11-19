import React from "react";
import { Card, TextField } from "@mui/material";
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
import { makeStyles } from "@mui/styles";
import { MenuItem } from "@mui/material";
import { Grid } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
  }

  dialogClickOpen = () => {
    this.open = true;
    this.forceUpdate();
  };

  dialogClose = () => {
    this.open = false;
    this.forceUpdate();
  };

  render() {
    const { classes } = this.props;

    return (
      <CardLayout elevation={0}>
        <CardContent>
          <Box className={classes.header}>
            <Box sx={{ width: '12%' }} className={classes.header}>
              <Avatar sx={{ bgcolor: this.props.product.avatarColor, width: 60, height: 60 }}>{this.props.product.avatarInitials}</Avatar>
            </Box>
            <Box sx={{ width: '18%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{this.props.product.name}</Typography>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px'}}>{this.props.product.price}</Typography>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.product.stock}</Typography>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.product.sold}</Typography>
            </Box>
            <Box sx={{ width: '18%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.product.shop}</Typography>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}> 
              <div style={{ display:'flex', justifyContent:'center' }}>
              { this.props.product.ratings < 2.5 ?
                <Card variant="outlined" style={{
                  backgroundColor: "#E04A4A33",
                  border: 'none',
                  width: '75%'}}>
                <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#812525'}}>{this.props.product.ratings}</Typography>
                </Card> :
                (
                  this.props.product.ratings > 3.5 ?
                  <Card variant="outlined" style={{
                    backgroundColor: "#B3E24B33",
                    border: 'none',
                    width: '75%'}}>
                  <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#5B8125'}}>{this.props.product.ratings}</Typography>
                  </Card> :
                  <Card variant="outlined" style={{
                    backgroundColor: "#F4AF5433",
                    border: 'none',
                    width: '75%'}}>
                  <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#D28C40'}}>{this.props.product.ratings}</Typography>
                  </Card>
                )
              }
              </div>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.product.comments}</Typography>
            </Box>
          </Box>
        </CardContent>
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



export default withStyles(styles, { withTheme: true })(ProductCard);