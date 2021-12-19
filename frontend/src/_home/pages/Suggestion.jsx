import { useState, useEffect } from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import fakeProducts from "~/common/faker/fakeProducts";
import CardAndPagination from "../components/commonBase/CardAndPagination";
import HeaderWithIcon from "../components/commonBase/HeaderWithIcon";
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/system";
import axios from "axios";
import config from "~/common/constants";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";

const SuggestionPage = () => {
    const classes = useStyles();
    const { user } = useRecoilValue(authState);
    const [skip, setSkip] = useState(0);
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);

    const onPageChange = (e, value) => {
        setPage(value);
    };

    const getData = () => {
        axios
            .get(`${config.SERVER_URL}/home/suggestions/${user.id}?take=16&skip=${skip}`)
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
    };

    useEffect(() => {
        setSkip((page - 1) * 16);
        getData();
    }, [page])

    return (
        <Box className={classes.suggestionWrapper}>
            <Box className={classes.content}>
                <HeaderWithIcon title="Suggestion" ItemIcon={HighlightIcon} />
                <CardAndPagination
                    products={products}
                    onPageChange={onPageChange}
                    page={page}
                />
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