import { useState, useEffect } from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import fakeProducts from "~/common/faker/fakeProducts";
import CardAndPagination from "../components/commonBase/CardAndPagination";
import HeaderWithIcon from "../components/commonBase/HeaderWithIcon";
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/system";
import axios from "axios";
import Swal from 'sweetalert2';
import config from "~/common/constants";
import { useRecoilValue } from "recoil";
import authState from "../../common/store/authState";


const SuggestionPage = props => {
    const classes = useStyles();
    const auth = useRecoilValue(authState);
    const [skip, setSkip] = useState(0);
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

    const getData = () => {
        setSkip((page - 1 )* 16);
		axios
			.get(`${config.SERVER_URL}/suggestions/${auth.user.id}?take=16&skip=${skip}`)
			.then(({data}) => {
				if (data.success) {
					return setSuggestions(data.suggestions);
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
		getData();
	}, [page])

    return (
        <Box className={classes.suggestionWrapper}>
            <Box className={classes.content}>
                <HeaderWithIcon title="Suggestion" ItemIcon={HighlightIcon}  />
                <CardAndPagination 
                    products={products} 
                    onFavorite={onFavorite} 
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