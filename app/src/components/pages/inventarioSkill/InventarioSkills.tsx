import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow, IconButton,
} from "@mui/material";
import { CustomAppBar } from "../../appBar";
import style from "./skill.module.css";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../utils/customComponents/tables/StyledTables";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { FormDiaglog } from "../../dialog/FormDiaglog";
import { Context } from "../../../context/Context";
import { ISkill } from "../../../context/types";
import { EditDialog } from "../../dialog/EditDialog";
import Swal from "sweetalert2";

export const InventarioSkills = () => {
  const { skills, getSkill, employee } = useContext(Context);
  const [searchValue, setSearchValue] = useState<string>("");

  const deleteSkill = async (id:string) => {
    await fetch(`http://localhost:3000/skills/${id}`, {
      method: "DELETE"
  }).then(() => {
      getSkill()
  })
  }

  const handleSureDelete = (id:string) => {
    return (
      Swal.fire({
        title: "¿Estas seguro?",
        text: "¿Seguro que quieres elimiar esta habilidad?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!"
      }).then((result) => {
        if (result.isConfirmed) {
          deleteSkill(id)
          Swal.fire({
            title: "Eliminada!",
            text: "La habilidad a sido eliminada correctamente!",
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
          key={'holaa'}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          title="Inventario de Skills"
          placeholder="Busca por habilidad..."
        />
      </header>
      <section className={style.dataTableSection}>
        <TableContainer component={Paper} sx={{ width: "90%", mt: 10, maxHeight: 680 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="center">Descripcion</StyledTableCell>
                <StyledTableCell align="right">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skills.map((skill: ISkill) => (
                <StyledTableRow key={skill.id}>
                  <StyledTableCell component="th" scope="row">
                    {skill.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {skill.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton color='primary' disabled={employee.role !== 'admin'} onClick={() => handleSureDelete(skill.id)}>
                    <DeleteIcon />
                      
                    </IconButton>
                    <EditDialog skill={skill}/>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <FormDiaglog />
    </main>
  );
};
