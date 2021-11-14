import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  goToShopButton: {
    color: "white",
    borderRadius: "7.14px !important",
  },
  profileBarContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: "48px",
    height: "48px",
  },
  buttonZone: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  textZone: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "20px",
    
  },
  profileBarDisplayName: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "15px",
    '& > h6': {
      height: "24px",
      lineHeight: "24px",
      fontSize: "22px !important",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "calc(50vw - 100px)",
    },
    '& > p': {
      fontSize: "16px !important",
      color: "#A0A3BD !important",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "calc(30vw - 100px)",
    },
  },
  
  profileBarNoti: {
    color: "#323232",
    width: "15px !important",
    height: "16px !important",
    margin: "0px",
  },
  
});

export default useStyles;
