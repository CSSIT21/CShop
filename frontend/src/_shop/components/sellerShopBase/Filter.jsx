import React, { useState, useEffect } from "react";

import { Box, Divider, Grid, Pagination } from "@mui/material";
import { FilterAltOutlined } from "@mui/icons-material";
import CateGoryFilter from "./FilterBase/CategoryFiler";
import CategoryFilterPrice from "./FilterBase/CategoryFilterPrice";
import CategoryFilterRate from "./FilterBase/CategoryFilterRate";
import CateGoryFilterService from "./FilterBase/CategoryFilterService";
import CategoryFilterAvailability from "./FilterBase/CategoryFilterAvailability";
import axios from "axios";
import config from "~/common/constants";
import ProductCard from "~/common/components/ProductCard";
import { For } from "~/common/utils";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Filter = ({ categories = [], category_Id = 0 }) => {
  const { id, cateId } = useParams();
  const auth = useRecoilValue(authState);
  const [count, setcount] = useState(0);
  const itemPerPage = 16;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [categoryId, setcategoryId] = useState(category_Id);
  const [priceLow, setpriceLow] = useState(0);
  const [priceHigh, setpriceHigh] = useState(50000);
  const [readyToShip, setreadyToShip] = useState(true);
  const [outOfStock, setoutOfStock] = useState(false);
  const [rating, setrating] = useState(0);
  const onFavourite = (index) => {
    setItems((items) => {
      if (auth.isLoggedIn) {
        const target = items.find((e) => e.id == index);
        if (target.customer_wishlist.length > 0) {
          target.customer_wishlist.pop();
        } else {
          target.customer_wishlist = [
            { product_id: target.id, customer_id: auth.user.id },
          ];
        }
      } else {
        Swal.fire({
          text: "Please login to add a product to your wishlist!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      return [...items];
    });
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    let userId = 0;
    if (auth.isLoggedIn) {
      console.log("login");
      userId = auth.user.id;
    }
    axios
      .get(
        `${config.SERVER_URL}/sellershop/products/${id}?page=${page}&category=${categoryId}&priceLow=${priceLow}&priceHigh=${priceHigh}&readyToShip=${readyToShip}&outOfStock=${outOfStock}&rating=${rating}&customer_id=${userId}`
      )
      .then(({ data }) => {
        setItems(data.products);
        setcount(data.count);
        console.log(data);
      });
  }, [page, categoryId, priceLow, priceHigh, rating, readyToShip, outOfStock]);
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
          <CateGoryFilter
            categories={categories}
            categoryId={categoryId}
            setcategoryId={setcategoryId}
          />
          <CategoryFilterPrice
            setpriceLow={setpriceLow}
            setpriceHigh={setpriceHigh}
          />
          <CategoryFilterRate setrating={setrating} />
          <CateGoryFilterService />
          <CategoryFilterAvailability
            readyToShip={readyToShip}
            setreadyToShip={setreadyToShip}
            setoutOfStock={setoutOfStock}
            outOfStock={outOfStock}
          />
        </Box>

        <Box sx={{ width: "80%" }}>
          <Box>
            <Grid
              container
              spacing={2}
              sx={{ paddingLeft: "30px", paddingTop: "30px" }}
            >
              <For
                each={items}
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
              count={Math.ceil(count / itemPerPage)}
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
