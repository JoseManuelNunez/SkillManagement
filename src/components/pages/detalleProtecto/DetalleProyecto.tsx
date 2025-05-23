import { useParams } from "react-router-dom";
import { CustomAppBar } from "../../appBar";
import { useContext, useState } from "react";
import { Context } from "../../../context/Context";
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../../utils/customComponents/tables/StyledTables";
import { RenderEmployee } from "../../renderEmployee/RenderEmployee";
import { RenderSkill } from "../../renderSkill/RenderSkill";
import style from './detalleProyecto.module.css'
import { AddSkillRequire } from "../../dialog/AddSkillRequire";
import { IProject } from "../../../context/types";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

export const DetalleProyecto = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	const { projects, removeSkillRequire, removeEmployeeInProject, employee: mainEmployee, changeProjectStatus } = useContext(Context);
	const { id } = useParams<{ id: string }>();

	const proyecto: IProject | undefined = projects.find((project) => project.id === id);
	console.log(proyecto);

  const handleremoveSkill = (id: string) => {
    if (!proyecto) return;
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
          removeSkillRequire(id, proyecto.id)
          Swal.fire({
            title: "Removida!",
            text: "La habilidad a sido Removida de correctamente!",
            icon: "success"
          });
        }
      })
    )
  }

  const handleRemoveEmployee = (id: string) => {
    console.log(id)
    if (!proyecto) return;
    return (
      Swal.fire({
        title: "¿Estas seguro?",
        text: "¿Seguro que quieres remover este empleado?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!"
      }).then((result) => {
        if (result.isConfirmed) {
          removeEmployeeInProject(id, proyecto.id)
          Swal.fire({
            title: "Removido!",
            text: "El empleado a sido Removido de correctamente!",
            icon: "success"
          });
        }
      })
    )
  }

  const handleChangeEstado = (e: SelectChangeEvent<string>) => {
		const {value} = e.target
    if (!proyecto) return;
    return (
      Swal.fire({
        title: "¿Estas seguro?",
        html: `¿Seguro que quieres cambiar el estado de este proyecto a <b>${value}</b>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!"
      }).then((result) => {
        if (result.isConfirmed) {
          changeProjectStatus(proyecto.id, value)
          Swal.fire({
            title: "Removido!",
            text: "El empleado a sido Removido de correctamente!",
            icon: "success"
          });
        }
      })
    )
  }

	if (!proyecto) return (
		<div className={style.containerLoader}>
			<div className={style.loader}></div>
		</div>
	)
	return (
		<main>
			<header>
				<CustomAppBar
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					title={proyecto.name}
					placeholder="Busca por habilidad..."
				/>
			</header>
			<section style={{display: 'flex', justifyContent: "space-around", width: "60vw", marginLeft: "10vw"}} >

			<TableContainer component={Paper} sx={{ width: "30%", mt: 10, maxHeight: 680 }}>
				<Table sx={{ minWidth: 300 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Empleado</StyledTableCell>
							<StyledTableCell align="right">Acciones</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{proyecto.assignedEmployees.map((employee) => (
							<StyledTableRow key={employee}>
								<StyledTableCell>
									<RenderEmployee
										id={employee}
									/>
								</StyledTableCell>
                <StyledTableCell align="right">
								<IconButton color="primary" disabled={mainEmployee.role !== 'admin'} onClick={() => handleRemoveEmployee(employee)}  >
                  <DeleteIcon />
                    </IconButton>    
							</StyledTableCell>
							</StyledTableRow>
						))}

					</TableBody>
				</Table>
				</TableContainer>
				<TableContainer component={Paper} sx={{ width: "60%", mt: 10, maxHeight: 680 }}>
					<Table sx={{ minWidth: 400 }} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell>Skill</StyledTableCell>
								<StyledTableCell align="center">Descripcion</StyledTableCell>
								<StyledTableCell align="center">Nivel Requerido</StyledTableCell>
								<StyledTableCell align="right">Acciones</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{proyecto.requiredSkills.map((skill) => (
								<StyledTableRow key={skill.skillId}>
									<StyledTableCell>
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
									<IconButton color="primary" disabled={mainEmployee.role !== 'admin'} onClick={() => handleremoveSkill(skill.skillId)}  >
                  <DeleteIcon />
                    </IconButton>        
							</StyledTableCell>
								</StyledTableRow>
							))}

						</TableBody>
					</Table>

				</TableContainer>

			</section>
			<InputLabel sx={{ml: 35, mt: 5}} id="demo-simple-select-label">Estado</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Skill"
              name="skill"
							sx={{width: '10%', ml: 35}}
							defaultValue={proyecto.estado}
							onChange={handleChangeEstado}
            >
                  <MenuItem value='desarrollo'>Desarrollo</MenuItem>
									<MenuItem value='Listo'>Listo</MenuItem>
									<MenuItem value='bloqueado'>Bloqueado</MenuItem>
            </Select>
			<AddSkillRequire proyecto={proyecto} />
		</main>
	);
}
