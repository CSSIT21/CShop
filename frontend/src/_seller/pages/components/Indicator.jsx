import { Box } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Indicator = (props) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 0,
        borderRadius: 1,
        p: 2,
        m: 3,
        backgroundColor: props.color,
        width: "100%",
        display: "inline-flex",
        justifyContent: "space-around",
      }}
    >
      <Box>
        <Box
          sx={{ color: props.fontColor, fontSize: 34, fontWeight: "medium" }}
        >
          {props.value}
        </Box>
        <Box sx={{ color: "#A0A3BD" }}>{props.name}</Box>
      </Box>
      <Box sx={{ display: "flex", marginLeft: "30%" }}>
        <props.icon sx={{ color: props.fontColor, fontSize: 72 }} />
      </Box>
    </Box>
  );
};

export default Indicator;
