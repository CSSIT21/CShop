import { useState } from "react";

import HighlightIcon from "@mui/icons-material/Highlight";
import fakeProducts from "~/common/faker/fakeProducts";
import CardAndPagination from "../components/commonBase/CardAndPagination";
import HeaderWithIcon from "../components/commonBase/HeaderWithIcon";
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/system";

const useStyles = makeStyles({
    suggestionWrapper: {
        width: '100%',
        minHeight: '100vh',

        display: 'flex',
        justifyContent: 'center',

        backgroundColor: '#FDF4DD',
    },
    content: {
        maxWidth: '1200px',
        padding: '50px 0',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Header = {
    title: "Suggestion",
    icon: HighlightIcon,
};

const SuggestionPage = props => {
    const classes = useStyles();

    const [page, setPage] = useState(1);
    const [products, setProducts] = useState(fakeProducts);

    const onFavorite = (index) => {
        setProducts((products) => {
            const target = products[index];
            target.favourite = !target.favourite;

            return [...products];
        });
    };

    const onPageChange = (e, value) => {
        setPage(value);
    };

    return (
        <Box className={classes.suggestionWrapper}>
            <Box className={classes.content}>
                <HeaderWithIcon header={Header} />
                <CardAndPagination products={products} onFavorite={onFavorite} onPageChange={onPageChange} page={page} />
            </Box>
        </Box>
    );
};
export default SuggestionPage;