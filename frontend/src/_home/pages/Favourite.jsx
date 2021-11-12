import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import fakeProducts from "~/common/faker/fakeProducts";
import CardAndPagination from "../components/commonBase/CardAndPagination";
import HeaderWithIcon from "../components/commonBase/HeaderWithIcon";
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/system";

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

const Header = {
    title: "Favorite",
    icon: FavoriteIcon,
};

const FavouritePage = (props) => {
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
        <Box className={classes.FavoriteWrapper}>
            <Box className={classes.content}>
                <HeaderWithIcon header={Header} />
                <CardAndPagination products={products} onFavorite={onFavourite} />
            </Box>
        </Box>
    );
};

export default FavouritePage;