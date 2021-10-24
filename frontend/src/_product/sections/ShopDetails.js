import React from "react";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ShopDetails = (props) => {
  return (
  <div classname="shopdetail">
    <div className="left-part">
      <Avatar alt="Shop" src="/static/images/avatar/1.jpg" sx={{ width: 95, height: 95 }} />
      <div className="shopName">
        Shop Name  
      </div>
      <div className="active">
        Active 19 minutes ago
      </div> 
      <div className="button">
        Chat now / Go to shop
      </div>
    </div>
    <div className="right-part">
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
        <Typography sx={{ minWidth: 100 }}>Rating</Typography>
        <Typography sx={{ minWidth: 100 }}>4.7</Typography>
        <Typography sx={{ minWidth: 100 }}>Followers</Typography>
        <Typography sx={{ minWidth: 100 }}>7.4k</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
        <Typography sx={{ minWidth: 100 }}>Products</Typography>
        <Typography sx={{ minWidth: 100 }}>6666</Typography>
        <Typography sx={{ minWidth: 100 }}>Joined</Typography>
        <Typography sx={{ minWidth: 100 }}>4 years ago</Typography>
      </Box>
    </div>
  </div>);
};

export default ShopDetails;
