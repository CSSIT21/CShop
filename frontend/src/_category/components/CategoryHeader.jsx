import CategoryHeaderLogo from "./Frame_42.png";
import CategoryHeaderAccessories from "./ACCESSORIES.png";
import CategoryHeaderElectronics from "./ELECTRONICS.png";
import CategoryHeaderFashion from "./FASHION.png";
import CategoryHeaderFood from "./FOOD.png";
import CategoryHeaderFurniture from "./FURNITURE.png";
import CategoryHeaderKids from "./KIDS.png";
import CategoryHeaderIt from "./IT.png"; 
import CategoryHeaderSports from "./SPORTS.png";
import CategoryHeaderEducation from "./EDUCATION.png";
import CategoryHeaderOther from "./OTHERS.png";
import { useParams } from 'react-router-dom';

  

const CategoryHeader = ({ title = "", ...rest }) => {
    const { id } = useParams();
    if(id == 2 ){
        return <img src={CategoryHeaderIt} {...rest} alt="" />;
    }else if(id == 3){
        return <img src={CategoryHeaderEducation} {...rest} alt="" />;
    }else if(id == 4){
        return <img src={CategoryHeaderFashion} {...rest} alt="" />;
    }
    else if(id == 10){
         return <img src={CategoryHeaderAccessories} {...rest} alt="" />;
    }
    else if(id == 5){
        return <img src={CategoryHeaderLogo} {...rest} alt="" />;
    }else if(id == 6){
        return <img src={CategoryHeaderFurniture} {...rest} alt="" />;
    }else if(id == 7){
        return <img src={CategoryHeaderElectronics} {...rest} alt="" />;
    }else if(id == 8){
        return <img src={CategoryHeaderFood} {...rest} alt="" />;
    }else if(id == 9){
        return <img src={CategoryHeaderSports} {...rest} alt="" />;
    }else if(id == 11){
        return <img src={CategoryHeaderOther} {...rest} alt="" />; 
    }                                

};




export default CategoryHeader;
