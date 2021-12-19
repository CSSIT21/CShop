import CategoryHeaderLogo from "./Frame_42.png";
import CategoryHeaderAccessories from "./ACCESSORIES.png";
import CategoryHeaderBook from "./BOOK.png";
import CategoryHeaderComputer from "./COMPUTER.png";
import CategoryHeaderElectronics from "./ELECTRONICS.png";
import CategoryHeaderFashion from "./FASHION.png";
import CategoryHeaderFood from "./FOOD.png";
import CategoryHeaderFurniture from "./FURNITURE.png";
import CategoryHeaderKids from "./KIDS.png";
//import CategoryHeaderMobile from "./MOBILE.png"; 
import CategoryHeaderSports from "./SPORTS.png";
import CategoryHeaderStationary from "./STATIONARY.png";
import { useParams } from 'react-router-dom';

  

const CategoryHeader = ({ title = "", ...rest }) => {
    const { id } = useParams();
    if(id == 0 ){
        return <img src={CategoryHeaderComputer} {...rest} alt="" />; //free ship
         //waitin for p
    }else if(id == 1 ){
        return <img src={CategoryHeaderElectronics} {...rest} alt="" />;
    }else if(id == 2){
        return <img src={CategoryHeaderStationary} {...rest} alt="" />;
    }else if(id == 3){
        return <img src={CategoryHeaderFashion} {...rest} alt="" />;
    }else if(id == 4){
        return <img src={CategoryHeaderKids} {...rest} alt="" />;
    }else if(id == 5){
        return <img src={CategoryHeaderLogo} {...rest} alt="" />;
    }else if(id == 6){
        return <img src={CategoryHeaderFurniture} {...rest} alt="" />;
    }else if(id == 7){
        return <img src={CategoryHeaderAccessories} {...rest} alt="" />;
    }else if(id == 8){
        return <img src={CategoryHeaderFood} {...rest} alt="" />;
    }else if(id == 9){
        return <img src={CategoryHeaderSports} {...rest} alt="" />;
    }else if(id == 10){
        return <img src={CategoryHeaderComputer} {...rest} alt="" />; //plants
        //waitin for p
    }                                       

};




export default CategoryHeader;
