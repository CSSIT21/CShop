import { useState, useEffect} from 'react';
import { Box } from '@mui/system';
import ProductSuggestion from "../components/SuggestionSection";
import fakeProducts from "~/common/faker/fakeProducts";
import CartSection from '../components/CartSection';
import axios from 'axios';

function ShoppingCartPage() {
    const [products, setProducts] = useState([]);
    const [sugproduct, setSugproduct] = useState(fakeProducts);
    const [discounts, setDiscounts] = useState([]);
    const [accountInfo, setAccountInfo] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/cart/1').then(item => {
            setProducts(item.data.newD.map(item => { 
                return ({...{
              ...item.productName,
              image: item.productName.product_picture[0].path || '',
              amount: item.productName.sold
            }})
            }))
            setDiscounts(item.data.customerDiscount.map(item => { 
                const discount = item.discount_id_from_iscount_user_code
                return ({
                    id: item.discount_id,
                    title: discount.description,
                    remaining: 1,
                    valid: (new Date(discount.end_date)).toDateString(),
                    claimed: false,
                    type: discount.discount_types,
                    limit: 1000,
                    min: discount.min_price,
                    value: discount.reduce_price / 100,
                    img: discount.picture_path
                });
            }))
            setAccountInfo([...item.data.customerDetail])
        });
    }, [])
    
    const onFavourite = (index) => {
        setSugproduct(sugproduct.map((item, ind) => {
            if (index === item.id) {
                return ({...item,favourite: !item.favourite});
            }
            return (item);
        }));
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
            <CartSection allProduct={products} setProduct={setProducts} discounts={discounts} accountInfo={accountInfo}/>
        </Box>
        <Box sx={{width: "88%"}}>
        <ProductSuggestion suggestionItems={sugproduct} onFavourite={onFavourite} />
        </Box>
    </Box>;
}

export default ShoppingCartPage
