import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import { useContext, useState } from "react";
import { Context } from "../../../context/Context";
import { IEmployee } from "../../../context/types";
import { RenderSkill } from "../../renderSkill/RenderSkill";
import { AddNewEmployeeInProyect } from "../../dialog/AddNewEmployeeInProyect";

export const Buscar = () => {
  const {
    skills,
    employees,
    skillFilter,
    setSkillFilter,
    nivelFilter,
    setNivelFilter,
  } = useContext(Context);
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
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "90%", ml: 10 }}
      >
        <FormControl
          sx={{
            mb: -5,
            display: "flex",
            alignSelf: "center",
            width: "30%",
          }}
        >
          <InputLabel id="demo-simple-select-label">Skill</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Skill"
            name="skill"
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            required
          >
            {skills.map((skill) => (
              <MenuItem key={skill.id} value={skill.id}>{skill.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            mb: -5,
            display: "flex",
            alignSelf: "center",
            width: "30%",
          }}
        >
          <InputLabel id="demo-simple-select-label">Nivel</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Nivel"
            name="nivel"
            value={nivelFilter}
            onChange={(e) => setNivelFilter(e.target.value)}
            required
          >
            <MenuItem value={"Básico"}>Básico</MenuItem>
            <MenuItem value={"Intermedio"}>Intermedio</MenuItem>
            <MenuItem value={"Avanzado"}>Avanzado</MenuItem>
          </Select>
        </FormControl>
        <Button sx={{ mt: 5 }} variant="contained" color="error" onClick={() => [setNivelFilter(''), setSkillFilter('')]}>
          Limpiar filtros
        </Button>
      </Box>
      <section className={style.dataTableSection}>
        <TableContainer component={Paper} sx={{ width: "90%", mt: 10, maxHeight: 680  }}>
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
              <>
                {employees.map((employee: IEmployee) => (
                  <>
                    {employee.skills
                      .filter((s) =>
                        skillFilter !== ""
                          ? s.skillId === skillFilter
                          : s.skillId
                      )
                      .filter((s) => 
                        nivelFilter !== ""
                          ? s.level === nivelFilter
                          : s.level
                      )
                      .map((skill) => (
                        <StyledTableRow key={employee.id}>
                          <StyledTableCell component="th" scope="row">
                            {employee.name}
                          </StyledTableCell>
                          <StyledTableCell>
                            <RenderSkill
                              Description={false}
                              id={skill.skillId}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {skill.level}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <AddNewEmployeeInProyect id={employee.id} key={employee.id} />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </>
                ))}
              </>
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </main>
  );
};
