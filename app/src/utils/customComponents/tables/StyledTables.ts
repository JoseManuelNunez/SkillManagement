import { TableCell, TableRow, tableCellClasses } from "@mui/material";
import styled from "styled-components";

export const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#FFBB71",
        color: "#3267AC",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#D4C7C730",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
