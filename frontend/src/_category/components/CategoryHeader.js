import CategoryHeaderLogo from './Frame_42.png';

const CategoryHeader = ({ title="", ...rest}) => {
    return <img src={CategoryHeaderLogo} {...rest}/>
};

export default CategoryHeader;