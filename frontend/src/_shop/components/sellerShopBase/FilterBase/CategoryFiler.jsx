import {
  Box,
  Divider,
  FormGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
const CateGoryFilter = ({ categories = [], categoryId, setcategoryId }) => {
  const handleChange = (event, idx) => {
    setcategoryId(event.target.value);
  };
  return (
    <>
      <Box sx={{ padding: "0px 0px 10px" }}>
        <Divider />
        <Box sx={{ padding: "10px 0px 0px" }} />
        <h3>Category</h3>
        <FormGroup>
          {categories.map((category, idx) => {
            return (
              <FormControlLabel
                key={idx}
                control={
                  <Radio
                    onChange={(e) => handleChange(e, idx)}
                    checked={parseInt(categoryId) === category.id}
                    value={category.id}
                  />
                }
                label={category.title}
              />
            );
          })}
        </FormGroup>
      </Box>
      <Divider />
    </>
  );
};

export default CateGoryFilter;
