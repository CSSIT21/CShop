import React from "react";

const ProductDescription = (props) => {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(open);
  };
  return <div>Product Detail</div>;
};

export default ProductDescription;
