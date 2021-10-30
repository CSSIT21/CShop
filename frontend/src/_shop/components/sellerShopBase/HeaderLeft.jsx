import React from 'react'
import { makeStyles } from '@mui/styles';
import { Typography,Button} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box } from "@mui/system";

    const useStyles = makeStyles({
        HeaderLeftShop:{
            position: 'relative',
            width:'30%',
        },

        ProfileShop:{
            borderRadius: '50%',
            position : 'relative',
            width:'20%',
        }

    });


const HeaderLeft = () => {
    const classes = useStyles();


//แก้ให้ละ
    return (
        <Box className={classes.HeaderLeftShop} >
            <Box className={classes.ProfileShop}></Box>
            <Box >
                <Typography component="h3" fontSize="30px" fontWeight="bold">Shop Name</Typography>
                <Typography component="h5" fontSize="23px" >Active 19 minutes ago</Typography>
                <Typography component="h5" fontSize="23px" >ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</Typography>

                <Button className={classes.ButtonChat} ><AddShoppingCartIcon />Chat now</Button>
            </Box>

            
            
        </Box>
    )
}

export default HeaderLeft
