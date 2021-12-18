import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SelectButton from "./SelectButton";
import { useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box } from "@mui/system";
import UpdateDialog from "./UpdateDialog";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#FD6637",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData("CSC02000000001", 159, 6.0, 24, 4.0),
//     createData("CSC23000000034", 237, 9.0, 37, 4.3),
//     createData("CSC67000002345", 262, 16.0, 24, 6.0),
//     createData("CSC39000000546", 305, 3.7, 67, 4.3),
//     createData("CSC72000000045", 356, 16.0, 49, 3.9),
// ];

export default function TableStatus({ data }) {
    const location = useLocation();
    const { pathname } = location;
    const editDialogRef = React.useRef(null);

    const convertTime = (time) => {
        const converted = time.split("T");
        return `${converted[0]}  ${converted[1].substring(0, 5)}`;
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Tracking number</StyledTableCell>
                            <StyledTableCell align="center">
                                Latest updated
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Created time
                            </StyledTableCell>
                            {pathname === "/admin/success" ? (
                                <StyledTableCell align="center">
                                    Success time
                                </StyledTableCell>
                            ) : (
                                <StyledTableCell align="center">
                                    Update status
                                </StyledTableCell>
                            )}
                            <StyledTableCell align="center">
                                Customer
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.tracking_number}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {convertTime(row.latest_update)}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {convertTime(row.added_date)}
                                </StyledTableCell>
                                {pathname === "/admin/success" ? (
                                    <StyledTableCell align="center">
                                        12-12-2021 10:56
                                    </StyledTableCell>
                                ) : (
                                    <StyledTableCell
                                        align="center"
                                        sx={{ width: 320 }}
                                    >
                                        <Box
                                            display="flex"
                                            width="100%"
                                            justifyContent="center"
                                        >
                                            <SelectButton status={row.status} />
                                            <IconButton
                                                sx={{ margin: "0 10px" }}
                                                onClick={() => {
                                                    editDialogRef.current.open();
                                                }}
                                            >
                                                <BorderColorIcon />
                                            </IconButton>
                                        </Box>
                                    </StyledTableCell>
                                )}
                                <StyledTableCell align="center">
                                    CShop
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UpdateDialog ref={editDialogRef} />
        </>
    );
}
