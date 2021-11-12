import { orange } from '@mui/material/colors'
import { Box } from '@mui/system'
import React from 'react'

function Nametype({name, color}) {
    return (
        <Box sx={{backgroundColor: 'orange', width: '100px' , pading: '100px', marginright: '50px'}}>
            <h2 sx={{ pading: '100px', marginright: '50px'}}>{name}</h2>
        </Box>
    )
}

export default Nametype
