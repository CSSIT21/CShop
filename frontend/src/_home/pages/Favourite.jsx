import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
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


const FavouritePage = (props) => {
    const classes = useStyles();
    const auth = useRecoilValue(authState);
	const [skip, setSkip] = useState(0);
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

    const getData = () => {
        setSkip((page - 1 )* 16);
		axios
			.get(`${config.SERVER_URL}/favorites/${auth.user.id}?take=16&skip=${skip}`)
			.then(({data}) => {
				if (data.success) {
					return setFavorites(data.favourites);
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
        <Box className={classes.FavoriteWrapper}>
            <Box className={classes.content}>
                <HeaderWithIcon title="Favorite" ItemIcon={FavoriteIcon} />
                <CardAndPagination products={products} onFavorite={onFavourite} onPageChange={onPageChange} />
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