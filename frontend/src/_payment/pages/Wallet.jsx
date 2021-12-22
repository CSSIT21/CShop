import { borderRadius, Box } from "@mui/system";
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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Popup from "../components/Popup";
import Axios from "axios";
import config from "~/common/constants";
import { useEffect } from "react";
import { useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const useStyles = makeStyles({
  sidebarWrapper: {
    display: "flex",
    backgroundColor: "white",
  },

  sidebarLeft: {
    width: "20%",
    margin: "1.5% 1.5% ",
  },

  sidebarRight: {
    height: "100vh",
    display: "flex",
    textAlign: "left",
    justifyContent: "center",
    background: "#f1f1f1",
  },

  cardWallet: {
    borderRadius: "25px",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  transTable: {
    width: "90%",
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

const Wallet = ({ order_id }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();

  useEffect(() => {
    getWallet();
  }, []);

  const [wallet, setWallet] = useState([]);
  const [order, setOrder] = useState([]);
  const orderId = { orderId: 238 };

  const getWallet = () => {
    Axios.post(`${config.SERVER_URL}/payment/mywallet`, orderId)
      .then((res) => {
        if (res.data.success) {
          setWallet(res.data.walletOrder.wallet);

          setOrder(res.data.walletOrder.order);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Box className={classes.sidebarWrapper}>
        <Box className={classes.sidebarLeft}>
          <Link to="/home">
            <img width="140px" src={CShopLogo} alt="Logo" />
          </Link>
          <Card
            className={classes.cardWallet}
            sx={{
              maxWidth: "100%",
              margin: "12% 0",
              padding: "4%",
              background: "#F7F7F7",
            }}
          >
            <CardContent>
              <Typography variant="h4" component="div">
                ฿ {wallet.balance}
              </Typography>
              <Typography sx={{ mb: 1.5 }} variant="caption" color="text.secondary">
                Current CShop Wallet Balance
              </Typography>
            </CardContent>
          </Card>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{
              width: "100%",
            }}
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
        </Box>

        <Box className={classes.sidebarRight} sx={{ width: "88%" }}>
          <Box className={classes.transTable}>
            <Typography variant="h5" margin="4% 3% 2%">
              All Transaction Detail
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      background: "#FFF8B7",
                    }}
                  >
                    <TableCell padding="20">Order Number</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      Withdrawal&nbsp;
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      Deposit&nbsp;
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        textAlign: "center",
                      }}
                    >
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ textAlign: "center" }}>
                  {rows.map((row) => (
                    <TableRow
                      key={row.number}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" sx={{ border: 0 }}>
                        #{row.number}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ border: 0, textAlign: "center" }}
                      >
                        {row.withdrawal}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ border: 0, textAlign: "center" }}
                      >
                        {row.deposit}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          border: 0,
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "center",
                          color: "green"
                        }}
                      >
                        <CheckCircleRoundedIcon />
                        Success
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Wallet;
