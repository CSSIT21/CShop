import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography, Grid} from "@mui/material";
import { Highlight as HighlightIcon } from "@mui/icons-material";
import { For } from "~/common/utils";
import ProductCard from "~/common/components/ProductCard";
import fakeProducts from "~/common/faker/fakeProducts";

const useStyles = makeStyles({
    suggestionpageWrapper: {
        width: '100%',
        boxSizing: 'border-box',
        padding:'50px 200px',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#FDF4DD',
    },

    suggestionHeader: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',

        marginBottom:'50px',
    },
});

const SugggestionPage = props => {
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

    return (
        <Box className={classes.suggestionpageWrapper}>
            <Typography component="span"  
                fontSize='30px'
                fontWeight={600}
                className={classes.suggestionHeader}
            >
                <HighlightIcon sx={{marginRight: '10px', color: "#FD6637"}} />
                Suggestions
            </Typography>

             <Grid container spacing={2} mb={5}>
				<For each={products} children={(product) => (
					<Grid item xs={6} md={3} mb={3}>
						<ProductCard product={product} onFavourite={onFavourite} to="/product/1" key={product.id} />
					</Grid>
				)} />
			</Grid>
        </Box>
    )
};

export default SugggestionPage;