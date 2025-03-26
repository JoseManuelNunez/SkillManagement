import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../utils/customComponents/tables/StyledTables";
import { CustomAppBar } from "../../appBar";
import style from "./proyectos.module.css";
import { useContext, useState } from "react";
import { Context } from "../../../context/Context";
import { IProject } from "../../../context/types";
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
export const Proyectos = () => {
  const { projects } = useContext(Context);
  const [searchValue, setSearchValue] = useState<string>("");
  const navegare = useNavigate()

  return (
    <main>
      <header>
        <CustomAppBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          title="Proyectos"
          placeholder="Busca por habilidad..."
        />
      </header>
      <section className={style.dataTableSection}>
        <TableContainer component={Paper} sx={{ width: "90%", mt: 10, maxHeight: 680  }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="center">Descripcion</StyledTableCell>
                <StyledTableCell align="right">
                  Acciones
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project: IProject) => (
                <StyledTableRow key={project.id}>
                  <StyledTableCell component="th" scope="row">
                    {project.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {project.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <SettingsIcon onClick={() => navegare(`/detalle-proyecto/${project.id}`)} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </main>
  );
};
