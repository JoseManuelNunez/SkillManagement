import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CustomAppBar } from "../../appBar";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../utils/customComponents/tables/StyledTables";
import style from "./buscar.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState } from "react";
import { Context } from "../../../context/Context";
import { ISkill } from "../../../context/types";

export const Buscar = () => {
  const {skills} = useContext(Context)
  const [searchValue, setSearchValue] = useState<string>("");


  return (
    <main>
      <header>
        <CustomAppBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          title="Empleados"
          placeholder="Busca por habilidad..."
        />
      </header>
      <section className={style.dataTableSection}>
        <TableContainer component={Paper} sx={{ width: "90%", mt: 10 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Skill</StyledTableCell>
                <StyledTableCell align="right">Nivel</StyledTableCell>
                <StyledTableCell align="right">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchValue ? (
                <>
                  {skills.filter((skill: ISkill) => skill.name.includes(searchValue)).map((skill) => (
                    <StyledTableRow key={skill.id}>
                      <StyledTableCell component="th" scope="row">
                        loren
                      </StyledTableCell>
                      <StyledTableCell>loren</StyledTableCell>
                      <StyledTableCell align="right">loren</StyledTableCell>
                      <StyledTableCell align="right">
                        <DeleteIcon />
                        <EditIcon />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </>
              ) : (
                <>
                  <StyledTableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center">
                      Busca por habilidades
                    </StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </StyledTableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </main>
  );
};
