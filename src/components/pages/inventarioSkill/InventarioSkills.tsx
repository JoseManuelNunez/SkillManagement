import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CustomAppBar } from "../../appBar";
import style from "./skill.module.css";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../utils/customComponents/tables/StyledTables";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const InventarioSkills = () => {
  return (
    <main>
      <header>
        <CustomAppBar
          title="Inventario de Skills"
          placeholder="Busca por habilidad..."
        />
      </header>
      <section className={style.dataTableSection}>
        <TableContainer component={Paper} sx={{ width: "90%", mt: 10 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="center">Descripcion</StyledTableCell>
                <StyledTableCell align="right">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 1, 1, 1].map((index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    loren
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ratione deserunt modi...{" "}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <DeleteIcon />
                    <EditIcon />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <Button
        variant="contained"
        color="success"
        sx={{ float: "right", mr: 10, mt: 2 }}
      >
        Crear Nueva Skill
      </Button>
    </main>
  );
};
