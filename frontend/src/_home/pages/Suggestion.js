import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography, Grid, Pagination } from "@mui/material";
import { Highlight as HighlightIcon } from "@mui/icons-material";
import { For } from "~/common/utils";
import ProductCard from "~/common/components/ProductCard";
import fakeProducts from "~/common/faker/fakeProducts";

const useStyles = makeStyles({

    suggestionpageWrapper: {
        width: '100%',
        minHeight: '100vh',

        display: 'flex',
        justifyContent: 'center',
        
        backgroundColor: '#FDF4DD',
    },
    
    suggestionContent: {
        maxWidth: '1200px',
        padding:'50px 0',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    suggestionHeader: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const SugggestionPage = props => {
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
        setPage(value);
    };

    return (
        <Box className={classes.suggestionpageWrapper}>
            <Box className={ classes.suggestionContent}>
            <Typography component="span"  
                fontSize='30px'
                fontWeight={600}
                mb={6}
                className={classes.suggestionHeader}
            >
                <HighlightIcon sx={{marginRight: '10px', color: "#FD6637"}} />
                Suggestions
            </Typography>

             <Grid container spacing={2} mb={5}>
				<For each={products.slice(0, )} children={(product) => (
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

export default SugggestionPage;