import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import CButton from "../../CButton";

const Search = ({
  showButton = true,
  placeholder = "What are you looking for?",
}) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.searchBox}>
        <SearchIcon className={classes.searchIcon} />
        <input className={classes.searchInput} placeholder={placeholder} />
        {showButton && <CButton title="Search" width="90px" height="38px" />}
      </Box>
    </>
  );
};

const useStyles = makeStyles({
  searchBox: {
    width: "100%",
    height: 46,
    position: "relative",
    padding: "0px 6px 0px 24px",

    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",

    borderRadius: 10,
    backgroundColor: "#ECECEE",
    transition: "all ease 0.125s",

    "&:focus-within": {
      boxShadow: "1px 2px 4px rgb(0,0,0,0.2)",
    },
  },
  searchInput: {
    width: "100%",
    padding: 5,

    color: "#A0A3BD",
    border: "none",
    backgroundColor: "transparent",
    fontSize: "15px",

    "&:focus": {
      outline: "none",
      color: "black",
    },
  },

  searchIcon: {
    color: "#A0A3BD",
    cursor: "pointer",

    "&:hover": {
      color: "#6e6e6e"
    },
  },

});

export default Search;
