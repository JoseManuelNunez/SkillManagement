import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CustomAppBar } from "../../appBar";
import style from "./perfil.module.css";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../utils/customComponents/tables/StyledTables";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { RenderSkill } from "../../renderSkill/RenderSkill";
import { Context } from "../../../context/Context";
import { SelectDialog } from "../../dialog/SelectDialog";
import Swal from "sweetalert2";



export const Perfil = () => {
  const { employee, removeEmployeeSkill } = useContext(Context)
  const [searchValue, setSearchValue] = useState<string>('');


  const handleSureDelete = (id:string) => {
    return (
      Swal.fire({
        title: "¿Estas seguro?",
        text: "¿Seguro que quieres remover esta habilidad?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!"
      }).then((result) => {
        if (result.isConfirmed) {
          removeEmployeeSkill(id)
          Swal.fire({
            title: "Removida!",
            text: "La habilidad a sido Removida de correctamente!",
            icon: "success"
          });
        }
      })
    )
  }

  if (employee.name === undefined) return (
    <div className={style.containerLoader}>
    <div className={style.loader}></div>
  </div>
  );
  return (
    <main>
      <header>
        <CustomAppBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          title={`Bienvenido, ${employee.name}!`}
          placeholder="Busca por habilidad..."
        />
      </header>
      <section className={style.dataTableSection}>
        <TableContainer component={Paper} sx={{ width: "90%", mt: 10, maxHeight: 680  }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Skill</StyledTableCell>
                <StyledTableCell align="center">Descripcion</StyledTableCell>
                <StyledTableCell align="center">Nivel</StyledTableCell>
                <StyledTableCell align="right">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employee.skills.filter((s) => s).map((skill) => (
                <StyledTableRow key={skill.skillId}>
                  <StyledTableCell component="th" scope="row">
                    <RenderSkill
                      Description={false}
                      id={skill.skillId.toString()}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <RenderSkill
                      Description={true}
                      id={skill.skillId.toString()}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {skill.level}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <DeleteIcon onClick={() => handleSureDelete(skill.skillId)} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <SelectDialog />
    </main>
  );
};
