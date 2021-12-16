import { useState, useEffect} from 'react';
import { Box } from '@mui/system';
import ProductSuggestion from "../components/SuggestionSection";
import fakeProducts from "~/common/faker/fakeProducts";
import CartSection from '../components/CartSection';
import axios from 'axios';

function ShoppingCartPage() {
    const [products, setProducts] = useState(fakeProducts);
    useEffect(() => {
        axios.get('http://localhost:8080/cart/1').then(item => { console.log(item.data) });
    },[])

    const onFavourite = (index) => {
        setProducts((products) => {
          const target = products[index];
          target.favourite = !target.favourite;
          return [...products];
        });
    };

    return <Box sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: 'wrap'
      }}>
        <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexWrap: 'wrap',
            backgroundColor: '#F3F4F5'
        }}>
            <CartSection/>
        </Box>
        <Box sx={{width: "88%"}}>
        <ProductSuggestion suggestionItems={products} onFavourite={onFavourite} />
        </Box>
    </Box>;
}

export default ShoppingCartPage
