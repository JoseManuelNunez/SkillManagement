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



export const Perfil = () => {
  const { employee, removeEmployeeSkill } = useContext(Context)
  const [searchValue, setSearchValue] = useState<string>('');



  if (employee.name === undefined) return <></>;
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
        <TableContainer component={Paper} sx={{ width: "90%", mt: 10 }}>
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
              {employee.skills.map((skill) => (
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
                    <DeleteIcon onClick={() => removeEmployeeSkill(skill.skillId)} />
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
