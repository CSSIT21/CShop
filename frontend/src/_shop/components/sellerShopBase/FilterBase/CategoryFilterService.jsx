import {
  Box,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
const CateGoryFilterService = () => {
  return (
    <Box sx={{ padding: "0px 0px 10px" }}>
      <Divider />
      <Box sx={{ padding: "10px 0px 0px" }} />
      <h3>Service</h3>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Free Shipping" />
        <FormControlLabel control={<Checkbox />} label="With Discount" />
      </FormGroup>
    </Box>
  );
};

export default CateGoryFilterService;
