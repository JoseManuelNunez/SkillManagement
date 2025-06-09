import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, FormControl, InputLabel, Select, MenuItem, DialogActions, IconButton } from '@mui/material';
import React, { useContext } from 'react'
import { IProject } from '../../context/types';
import { Context } from '../../context/Context';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Swal from 'sweetalert2';


export const AddNewEmployeeInProyect = ({id}:{id:string}) => {
	const { addNewEmployeeInProject, employees, employee, projects } = useContext(Context);



function filterProjectsByEmployeeSkills(): IProject[] {
	const employee = employees.find((e) => e.id === id)
	return projects.filter(project => {
		const isEmployeeAssigned = project.assignedEmployees.includes(employee!.id);


		return !isEmployeeAssigned;
	});
}



	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<IconButton color='primary' disabled={employee.role !== 'admin'} onClick={handleClickOpen}>
			<AccountTreeIcon
			/>

			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: "form",
					onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						const formData = new FormData(event.currentTarget);
						const formJson = Object.fromEntries(formData.entries());
						const project = formJson.proyecto ;

						const theProject = projects.find((p) => p.id === project) ?? ({} as IProject);

						const hasMatchingSkill = theProject.requiredSkills.some(requiredSkill => {
							return employee?.skills.some(employeeSkill => 
								employeeSkill.skillId === requiredSkill.skillId && employeeSkill.level === requiredSkill.level
							);
					});
					if (!hasMatchingSkill) {
            console.log('no tiene las habilidades necesarias', hasMatchingSkill)
            handleClose();
						Swal.fire({
							title: "¿Estás seguro?",
							html: `El empleado <b>${employee.name}</b> no cuenta con las habilidades necesarias para este proyecto, ¿Deseas añadirlo de todos modos?`,
							icon: "warning",
							showCancelButton: true,
							confirmButtonColor: "#3085d6",
							cancelButtonColor: "#d33",
							confirmButtonText: "Yes, delete it!"
						}).then((result) => {
							if (result.isConfirmed) {
                addNewEmployeeInProject(id, project.toString());
								Swal.fire({
									title: "Deleted!",
									text: "Your file has been deleted.",
									icon: "success"
								});
							}
						});
						return
					}


					addNewEmployeeInProject(id, project.toString());
						handleClose();
					},
				}}
			>
				<DialogTitle>Añade a "{employee.name}" a un projecto</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Añade a <b>{employee.name}</b> a uno de los proyectos disponibles, procura que cuante con las habilidades y nevel de las mismas necesarios.
					</DialogContentText>
					<FormControl fullWidth sx={{mb: 1, mt: 3}}>
						<InputLabel id="demo-simple-select-label">Proyecto</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							label="proyecto"
							name="proyecto"
							required
						>
							{filterProjectsByEmployeeSkills().map((p) => (
								<MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="contained" color="error">
						Cancel
					</Button>
					<Button type="submit" variant="contained" color="success">
						Añadir
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
}
