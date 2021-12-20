import { Box } from "@mui/system";
import { Button, Divider, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import CShopLogo from "~/common/assets/images/Logo.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import PayByInternetBanking from "./PayByInternetBanking";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Popup from "../components/Popup";

const useStyles = makeStyles({
  navbarWrapper: {
    display: "flex",
    backgroundColor: "white",
    marginBottom: "1%",
  },

  navbarRight: {
    color: "#FD6637",
    padding: "0 0 0 5%",
    display: "flex",
    textAlign: "center",
    justifyContent: "left",
    alignItems: "center",
    background: "#FFE8E1CC",
  },

  cardWallet: {
    borderRadius: "20px",
    width: "25%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  transTable: {
    margin: "1%",
    width: "75%",
    border: "1",
    borderColor: "gray",
  },

  popup: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
});

function createData(number, withdrawal, deposit, success) {
  return { number, withdrawal, deposit, success };
}

const rows = [
  createData("1203564", "None", 123.45, true),
  createData("1567879", 123.45, "None", false),
];

const Wallet = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  return (
    <>
      <Box className={classes.navbarWrapper}>
        <Box
          sx={{
            width: "12%",
            padding: "10px",
            margin: "0 20px 0 0",
          }}
        >
          <Link to="/home">
            <img width="80%" src={CShopLogo} alt="Logo" />
          </Link>
        </Box>

        <Box className={classes.navbarRight} sx={{ width: "88%" }}>
          <Typography variant="h5">Wallet</Typography>
        </Box>
      </Box>

      <Box className={classes.navbarWrapper}>
        <Card
          className={classes.cardWallet}
          sx={{
            minWidth: 275,
            margin: "0 0 0 1%",
            padding: "2%",
            background: "#F7F7F7",
          }}
        >
          <CardContent>
            <Typography variant="h4" component="div">
              ฿ 0
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Current CShop Wallet Balance
            </Typography>
          </CardContent>
          <Divider sx={{ margin: " 2% 0 5% 0" }} />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add Money to Wallet
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Popup />
          </Modal>
        </Card>

        <Box className={classes.transTable}>
          <Typography variant="h5" marginLeft="3%">
            All Transaction Detail
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ border: "1px solid #ddd" }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="20">Order Number</TableCell>
                  <TableCell align="right">Withdrawal&nbsp;</TableCell>
                  <TableCell align="right">Deposit&nbsp;</TableCell>
                  <TableCell align="right">Success</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.number}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.number}
                    </TableCell>
                    <TableCell align="right">{row.withdrawal}</TableCell>
                    <TableCell align="right">{row.deposit}</TableCell>
                    <TableCell align="right">{row.success}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <PayByInternetBanking/>
    </>
  );
};

export default Wallet;
