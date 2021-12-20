import { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/system";
import { Typography, Grid, Pagination } from '@mui/material';
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeaderWithIcon from "../components/commonBase/HeaderWithIcon";
import ProductCard from "~/common/components/ProductCard";
import { For } from "~/common/utils/index";
import axios from "axios";
import config from "~/common/constants";
import Swal from 'sweetalert2';
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";


const FavouritePage = () => {
    const classes = useStyles();
    const { isLoggedIn, user } = useRecoilValue(authState);
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(1);

    const onFavorite = (id) => {
        if (isLoggedIn) {
            setProducts(products => {
                const target = products.find((e) => e.product_id_from_wishlist.id == id);
                const { product_id_from_wishlist: product } = target;

                if (product.customer_wishlist.length > 0) product.customer_wishlist.pop();
                else product.customer_wishlist = [
                    { product_id: product.id, customer_id: user.id },
                ];

                return [...products];
            });
        }
        else {
            Swal.fire({
                text: "Please login to add a product to your wishlist!",
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#FD6637",
                width: 300,
                timer: 2000,
                timerProgressBar: true
            });
        }
    };

    const onPageChange = (e, value) => {
        setPage(value)
    };

    const getData = () => {
        if (isLoggedIn) {
            axios
                .get(`${config.SERVER_URL}/home/favorites/${user.id}?take=16&skip=${(page - 1) * 16}`)
                .then(({ data }) => {
                    if (data.success) {
                        console.log(data.favorites.products);
                        setCount(data.favorites.count);
                        return setProducts(data.favorites.products);
                    }
                    else {
                        return console.log(data);
                    }
                })
                .catch((err) => {
                    return console.log(err.message);
                })
        }
    };

    useEffect(() => {
        getData();
    }, [page])

    return (
        <Box className={classes.FavoriteWrapper}>
            <Box className={classes.content}>
                <HeaderWithIcon title="Wish list" ItemIcon={FavoriteIcon} />
                {products.length > 0
                    ? (<>

                        <Grid container spacing={10} mb={5}>
                            <For each={products} children={({ product_id_from_wishlist: product, id }) => (
                                <Grid item xs={2} md={3} mb={3} key={id}>
                                    <ProductCard product={product} onFavourite={onFavorite} />
                                </Grid>
                            )} />
                        </Grid>

                        <Pagination
                            count={Math.ceil(count / 16)}
                            shape="rounded"
                            color="primary"
                            page={page}
                            onChange={onPageChange}
                        />
                    </>)
                    : (<Typography
                        textAlign="center"
                        fontSize={16}
                        fontWeight={400}
                        color="gray">
                        No products in your wish list
                    </Typography>)}
            </Box>
        </Box>
    );
};

const useStyles = makeStyles({
    FavoriteWrapper: {
        width: '100%',
        minHeight: '100vh',

        display: 'flex',
        justifyContent: 'center',

        backgroundColor: '#FDF4DD',
    },
    content: {
        maxWidth: '1100px',
        padding: '50px 0',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FavouritePage;