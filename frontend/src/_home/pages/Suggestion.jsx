import { useState, useEffect, useLayoutEffect } from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import HeaderWithIcon from "../components/commonBase/HeaderWithIcon";
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/system";
import { Typography, Pagination, Grid } from '@mui/material';
import { For } from "~/common/utils/index";
import ProductCard from "~/common/components/ProductCard";
import axios from "axios";
import config from "~/common/constants";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";

const SuggestionPage = () => {
    const classes = useStyles();
    const { isLoggedIn, user } = useRecoilValue(authState);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);

    useEffect(() => {
        getData();
    }, [page]);

    const onPageChange = (e, value) => {
        setPage(value);
    };

    const getData = async () => {
        let customer_id = 0;
        if (isLoggedIn) customer_id = user.id;

        axios
            .get(`${config.SERVER_URL}/home/suggestions/${customer_id}?take=16&skip=${(page - 1) * 16}`)
            .then(({ data }) => {
                if (data.success) {
                    setCount(data.count);
                    setProducts(data.suggestions);
                    return window.scrollTo(0, 0);
                }
                else {
                    return console.log(data);
                }
            })
            .catch((err) => {
                return console.log(err.message);
            })
    };

    const onFavorite = (id) => {
        if (isLoggedIn) {
            setProducts(products => {
                const target = products.find((e) => e.id == id);

                if (target.customer_wishlist.length > 0) target.customer_wishlist.pop();
                else target.customer_wishlist = [
                    { product_id: target.id, customer_id: user.id },
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

    return (
        <Box className={classes.suggestionWrapper}>
            <Box className={classes.content}>
                <HeaderWithIcon title="Suggestion" ItemIcon={HighlightIcon} />
                {products.length > 0
                    ? (<>
                        <Grid container spacing={10} mb={5}>
                            <For each={products} children={(product) => (
                                <Grid item xs={2} md={3} mb={3} key={product.id}>
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
                        No products in your suggestion products
                    </Typography>)}
            </Box>
        </Box>
    );
};

const useStyles = makeStyles({
    suggestionWrapper: {
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

export default SuggestionPage;