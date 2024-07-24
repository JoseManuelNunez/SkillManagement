import { TableContainer, Paper, Table, TableHead, TableRow, TableBody } from "@mui/material"
import { StyledTableCell, StyledTableRow } from "../../../utils/customComponents/tables/StyledTables"
import { CustomAppBar } from "../../appBar"
import style from './proyectos.module.css'

export const Proyectos = () => {
  return (
    <main>
      <header>
        <CustomAppBar title="Proyectos" placeholder="Busca por habilidad..." />
      </header>
      <section className={style.dataTableSection}>
      <TableContainer component={Paper} sx={{width: '90%', mt: 10}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="center">Descripcion</StyledTableCell>
            <StyledTableCell align="center">Skills requeridas</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1,1,1,1,].map((index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                loren
              </StyledTableCell>
              <StyledTableCell align="center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione deserunt modi... </StyledTableCell>
              <StyledTableCell align="center">loren</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </section>
    </main>
  )
}
