import React from "react";
import { useState } from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import Carousel from "../../common/components/Carousel";
import CustomDot from "../../common/components/CarouselBase/CustomDot";
import ProductCard from "../../common/components/ProductCard";
import CarouselButton from "../../common/components/CarouselButton";

const useStyles = makeStyles({
    suggestionWrapper: {
        width: "100%",
        margin: "100px 0",
    },
    suggestionContent: {
        maxWidth: "1000px",
        margin: "0 0 40 0",
        padding: "40px 100px 80px 100px",

        backgroundColor: "#EFEFF1B2",
        borderRadius: "20px",
        marginBottom: "40px",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    suggestionHeader: {
        display: "flex",
        justifyContent: "space-between",

        width: "100%",
        marginBottom: "25px",
    },
    suggestionCarousel: {
        width: "100%",
    },
});

const ProductSuggestion = ({ suggestionItems, onFavourite }) => {
    const [items] = useState(suggestionItems);
    const [page, setPage] = useState(0);
    const classes = useStyles();
    const itemsPerRow = 4;
    const totalPage = Math.ceil(items.length / itemsPerRow);

    return (
        <Box className={classes.suggestionWrapper}>
            <Box className={classes.suggestionContent}>
                <Box className={classes.suggestionHeader}>
                    <Typography
                        component="span"
                        color="#000000"
                        fontSize="30px"
                        fontWeight={600}
                    >
                        Suggestions
                    </Typography>
                    <CarouselButton
                        pageHandle={setPage}
                        currentPage={page}
                        totalPage={totalPage}
                    />
                </Box>

                <Box className={classes.suggestionCarousel}>
                    <Carousel
                        items={items}
                        pageState={page}
                        setPageState={setPage}
                        itemsPerRow={4}
                    >
                        {(item, idx) => (
                            <ProductCard
                                product={item}
                                onFavourite={onFavourite}
                                to="/product/1"
                                key={item.id}
                            />
                        )}
                    </Carousel>
                </Box>
            </Box>

            <CustomDot
                width={50}
                setPageState={setPage}
                currentPage={page}
                totalPage={totalPage}
            />
        </Box>
    );
};

export default ProductSuggestion;
