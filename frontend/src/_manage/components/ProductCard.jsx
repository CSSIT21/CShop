import { Component } from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import config from '../../common/constants';
import { CardLayout } from "./UserCardStyled";
import { Avatar } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Box } from "@mui/system";
import axios from "axios";

export class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
    this.seller = {shop_name: "PENDING"};
    this.path = '';
    this.rating = 0;
  }

  dialogClickOpen = () => {
    this.open = true;
    this.forceUpdate();
  };

  dialogClose = () => {
    this.open = false;
    this.forceUpdate();
  };

  async componentDidMount(){
    const fetchedData = await axios.get(
        config.SERVER_URL + "/manageaccount/sellers/unique?id=" + this.props.product.shop_id
    );
    this.seller.shop_name = fetchedData.data.shop_name;

    if(this.props.product.product_picture.length > 0){
      this.path = this.props.product.product_picture[0].path;
    }

    let a = 0;

  if(this.props.product.product_reviews.length > 0){
    this.props.product.product_reviews.forEach((re) => {
      a = +a + +re.rating;
    })
    this.rating = (a / this.props.product.product_reviews.length).toFixed(2);
    }
    else{
      this.rating = 'N/A';
    }

    this.forceUpdate();
  }

  render() {
    const { classes } = this.props;

    return (
      <CardLayout elevation={0}>
        <CardContent>
          <Box className={classes.header}>
            <Box sx={{ width: '12%' }} className={classes.header}>
              <Avatar alt={this.props.avatarInitials} src={this.path} sx={{ width: 60, height: 60 }}/>
            </Box>
            <Box sx={{ width: '18%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontWeight: 600, fontSize: '15px'}}>{this.props.product.title}</Typography>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px'}}>{this.props.product.price}</Typography>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.product.quantity}</Typography>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.product.sold}</Typography>
            </Box>
            <Box sx={{ width: '18%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.seller.shop_name}</Typography>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}> 
              <div style={{ display:'flex', justifyContent:'center' }}>
              { this.rating < 2.5 ?
                <Card variant="outlined" style={{
                  backgroundColor: "#E04A4A33",
                  border: 'none',
                  width: '75%'}}>
                <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#812525'}}>{this.rating}</Typography>
                </Card> :
                (
                  this.rating > 3.5 ?
                  <Card variant="outlined" style={{
                    backgroundColor: "#B3E24B33",
                    border: 'none',
                    width: '75%'}}>
                  <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#5B8125'}}>{this.rating}</Typography>
                  </Card> :
                  <Card variant="outlined" style={{
                    backgroundColor: "#F4AF5433",
                    border: 'none',
                    width: '75%'}}>
                  <Typography style={{ fontSize: '15px', textAlign: 'center', color: '#D28C40'}}>{this.rating}</Typography>
                  </Card>
                )
              }
              </div>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.product.product_reviews.length}</Typography>
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