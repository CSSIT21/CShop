import React from 'react'
import { useParams } from "react-router";
import Box from "@mui/material/Box";
const ShopCategory = () => {
    const { id, cateId } = useParams();
    return (
        <Box>
            Own by: {id} <br/>
            category: {cateId}
        </Box>
    )
}

export default ShopCategory;
