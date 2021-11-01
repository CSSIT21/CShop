import {
  Box,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useParams } from "react-router";
const CateGoryFilter = ({ categories = [] }) => {

    const { id, cateId } = useParams();
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
                control={
                  <Checkbox />
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
