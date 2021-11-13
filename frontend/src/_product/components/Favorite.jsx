import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Box } from "@mui/system";

const Favourite = proprs => {
     return (
       <Box>
         <Checkbox
           icon={<FavoriteBorder />}
           checkedIcon={<Favorite />}
         />
       </Box>
     );
}
 


export default Favourite;
