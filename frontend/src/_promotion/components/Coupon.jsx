import React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function Coupon({namepro,detail,date,picture}) {
    const theme = useTheme();
    
    return (
        <div >
       <Card sx={{ display: 'flex',marginBottom:'40px', marginLeft:'50vh',width: '700px' , alignItems:'center', height:'200px' , backgroundColor:'yellow' }} >
      <Box sx={{ display: 'flex', flexDirection: 'column' ,backgroundColor: 'black'}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {namepro}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
         Detail
         {detail}
         Invalid
         {date}
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
        </div>
    )
}

export default Coupon
