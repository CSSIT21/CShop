import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography, Grid, Pagination } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import ProductCard from "~/common/components/ProductCard";
import { For } from "~/common/utils";
import fakeProducts from "~/common/faker/fakeProducts";

const useStyles = makeStyles({
    favoritepageWrapper: {
        width: '100%',
        minHeight: '100vh',

        display: 'flex',
        justifyContent: 'center',

        backgroundColor: '#FDF4DD',
    },
    favoriteContent: {
        maxWidth: '1200px',
        padding: '50px 0',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    favoriteHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const FavouritePage = props => {
    const classes = useStyles();

    const [page, setPage] = useState(1);
    const [products, setProducts] = useState(fakeProducts);

    const onFavourite = (index) => {
        setProducts((products) => {
            const target = products[index];
            target.favourite = !target.favourite;

            return [...products];
        });
    };

    const onPageChange = (e, value) => {
        setPage(value)
    };

    return (
        <Box className={classes.favoritepageWrapper}>
            <Box className={classes.favoriteContent}>
                <Typography component="span"
                    fontSize="30px"
                    fontWeight={600}
                    mb={6}
                    className={classes.favoriteHeader}
                >
                    <FavoriteIcon sx={{ marginRight: '10px', color: "#FD6637" }} />
                    Favorite
                </Typography>

                <Grid container spacing={2} mb={5} mx='auto'>
                    <For each={products} children={(product) => (
                        <Grid item xs={6} md={3} mb={3} key={product.id}>
                            <ProductCard product={product} onFavourite={onFavourite} to="/product/1" key={product.id} addToCart />
                        </Grid>
                    )} />
                </Grid>

                <Pagination count={10} shape="rounded" color="primary" page={page} onChange={onPageChange} />
            </Box>
        </Box>
    )
};

export default FavouritePage;