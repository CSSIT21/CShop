import { makeStyles } from "@mui/styles";
import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { useRecoilState } from "recoil";
import authState from "~/common/store/authState";
import DropdownDetail from "./DropdownDetail";

const AccountDropdown = () => {
  const classes = useStyles();
  const [auth] = useRecoilState(authState);

  return (
    <Box className={classes.account}>
      <DropdownDetail>
        <span className={classes.accountName}>{auth.user?.customer_info?.firstname} </span>
        <Avatar src={auth.user.customer_info.url} sx={{ width: 30, height: 30 }} />
      </DropdownDetail>
    </Box>
  );
};

const useStyles = makeStyles({
  account: {
    display: "flex",
    alignItems: "center",
  },

  accountName: {
    width: "100%",
    paddingRight: 10,
    color: "black",
    textTransform: "capitalize",
    fontWeight: 500,
  },
});

export default AccountDropdown;
