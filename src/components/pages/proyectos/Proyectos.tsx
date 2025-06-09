import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  Chip,
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
import { CreateNewProject } from "../../dialog/CreateNewProject";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";


export const Proyectos = () => {
  const { projects, getProject, employee } = useContext(Context);
  const [searchValue, setSearchValue] = useState<string>("");
  const navegare = useNavigate()

  const nowColor = (estado: string) => {
    if (estado === 'desarrollo') {
      return "info"
    } else if (estado === 'Listo') {
      return "success"
    } else {
      return "error"
    }
  }
  
  const deleteProject = async (id:string) => {
    await fetch(`http://localhost:3000/projects/${id}`, {
      method: "DELETE"
  }).then(() => {
    getProject()
  })
  }


  const handleSureDelete = (id:string) => {
    return (
      Swal.fire({
        title: "¿Estas seguro?",
        text: "¿Seguro que quieres remover este proyecto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!"
      }).then((result) => {
        if (result.isConfirmed) {
          deleteProject(id)
          Swal.fire({
            title: "Removido!",
            text: "El proyecto ha sido removido correctamente!",
            icon: "success"
          });
        }
      })
    )
  }



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
                <StyledTableCell align="center">Estado</StyledTableCell>
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
                  <StyledTableCell align="center">
                    <Chip color={nowColor(project.estado)} label={project.estado} />
                  </StyledTableCell>
                  <StyledTableCell align="right">

                    <IconButton color='primary' onClick={() => navegare(`/detalle-proyecto/${project.id}`)}  >
                    <SettingsIcon />
                      
                    </IconButton>
                    <IconButton color='primary' disabled={employee.role !== 'admin'} onClick={() => handleSureDelete(project.id)}>
                      <DeleteIcon />
                      
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <CreateNewProject />
    </main>
  );
};
