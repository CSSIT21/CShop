import { useState } from "react";
import {makeStyles} from "@mui/styles";
import { Box } from "@mui/system";
import { Typography, Grid} from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import ProductCard from "~/common/components/ProductCard";
import { For } from "~/common/utils";
import fakeProducts from "~/common/faker/fakeProducts";

const useStyles = makeStyles({
    favoritepageWrapper: {
        width: '100%',
        boxSizing: 'border-box',
        padding:'50px 200px',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#FDF4DD',
    },
    favoriteHeader: {
       display:'flex',
        justifyContent: 'center',
        alignItems: 'center',

        marginBottom:'50px',
        
        

    },
});

const FavouritePage = props => {
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [products, setProducts] = useState(fakeProducts);

    const onFavourite = (index) => {
        setProducts((products) => {
            const target = products[index];
            target.favourite = !target.favourite;

            return [...products];
        });
    };

    return(
        <Box className={classes.favoritepageWrapper}>
            <Typography component="span"
                fontSize="30px"
                fontWeight={600}
                className={ classes.favoriteHeader}
            >
                <FavoriteIcon sx={{marginRight: '10px', color: "#FD6637"}}  />
                Favorite
            </Typography>

             <Grid container spacing={2} mb={5} mx='auto'>
				<For each={products} children={(product) => (
					<Grid item xs={6} md={3} mb={3}>
						<ProductCard product={product} onFavourite={onFavourite} to="/product/1" key={product.id} addToCart />
					</Grid>
				)} />
			</Grid>
        </Box>
    )
};

export default FavouritePage;