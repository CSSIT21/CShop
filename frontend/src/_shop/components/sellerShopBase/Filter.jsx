import React, { useState, useEffect } from "react";

import { Box, Divider, Grid, Pagination } from "@mui/material";
import { FilterAltOutlined } from "@mui/icons-material";
import CateGoryFilter from "./FilterBase/CategoryFiler";
import CategoryFilterPrice from "./FilterBase/CategoryFilterPrice";
import CategoryFilterRate from "./FilterBase/CategoryFilterRate";
import CateGoryFilterService from "./FilterBase/CategoryFilterService";
import CategoryFilterAvailability from "./FilterBase/CategoryFilterAvailability";

import ProductCard from "~/common/components/ProductCard";
import { For } from "~/common/utils";

import FakeProduct from "~/common/faker/fakeProducts";

const Bestseller1 =
  "https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg";

const Filter = ({ categories = [] }) => {
  const itemPerPage = 16;
  const [items, setItems] = useState(FakeProduct);
  const [currentItems, setCurrentItems] = useState(items.slice(0, itemPerPage));
  const [page, setPage] = useState(1);
  const onFavourite = (index) => {
    setCurrentItems((items) => {
      const target = items[index];
      target.favourite = !target.favourite;

      return [...items];
    });
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setCurrentItems(items.slice(itemPerPage * (page - 1), itemPerPage * page));
  }, [page]);

  return (
    <Box sx={{ padding: "25px 50px" }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "20%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "50px 0px 20px",
            }}
          >
            <b>Filter</b>
            <FilterAltOutlined size="large" />
          </Box>
          <Divider />
          <CateGoryFilter categories={categories} />
          <CategoryFilterPrice />
          <CategoryFilterRate />
          <CateGoryFilterService />
          <CategoryFilterAvailability />
        </Box>

        <Box sx={{ width: "80%" }}>
          <Box>
            <Grid
              container
              spacing={2}
              sx={{ paddingLeft: "30px", paddingTop: "30px" }}
            >
              <For
                each={currentItems}
                children={(item, idx) => (
                  <Grid key={idx} item xs={6} md={3} mb={3}>
                    <ProductCard
                      product={item}
                      onFavourite={onFavourite}
                      to="/product/1"
                    />
                  </Grid>
                )}
              />
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "20px 0px",
            }}
          >
            <Pagination
              count={Math.ceil(items.length / itemPerPage)}
              shape="rounded"
              size="large"
              page={page}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
