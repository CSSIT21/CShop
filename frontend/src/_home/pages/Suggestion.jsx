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
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [product_ids, setProduct_ids] = useState([]);
    const [count, setCount] = useState(1);

    const onPageChange = (e, value) => {
        setPage(value);
    };

    const getData = async () => {
        if (isLoggedIn) {
            let productIds = [];
            try {
                if (product_ids.length == 0) {
                    console.log("test try");
                    const { data } = await axios.get(`https://ml-1.cshop.cscms.ml/suggestHomepage?uid=${user.id}`)
                    // setProduct_ids(data.products);
                    // productIds = data.products;
                    setProduct_ids([123, 234, 45, 452, 45, 92, 35, 6, 8, 9, 55, 7563, 92, 32, 6, 23, 2, 4, 5, 7, 34, 2, 35, 776, 4576, 908, 34]);
                    productIds = [123, 234, 45, 452, 45, 92, 35, 6, 8, 9, 55, 7563, 92, 32, 6, 23, 2, 4, 5, 7, 34, 2, 35, 776, 4576, 908, 34];
                    setCount(productIds.length);
                }

                if (product_ids.length > 0) {
                    console.log("test if");
                    productIds = product_ids;
                }

                console.log(productIds);
                axios
                    .get(`${config.SERVER_URL}/home/suggestions/${user.id}?product_ids=${productIds}&take=16&skip=${(page - 1) * 16}`)
                    .then(({ data }) => {
                        if (data.success) {
                            return setProducts(data.suggestions);
                        }
                        else {
                            return console.log(data);
                        }
                    })
                    .catch((err) => {
                        return console.log(err.message);
                    })
            }
            catch (err) {
                console.log(err.message);
            }
        }
    };

    const onFavorite = () => {

    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getData();
    }, [page]);

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