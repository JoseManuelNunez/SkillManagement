import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, FormControl, InputLabel, Select, MenuItem, DialogActions, IconButton } from '@mui/material';
import React, { useContext } from 'react'
import { IProject } from '../../context/types';
import { Context } from '../../context/Context';
import AccountTreeIcon from '@mui/icons-material/AccountTree';


export const AddNewEmployeeInProyect = ({id}:{id:string}) => {
  const { addNewEmployeeInProject, employees, employee, projects } = useContext(Context);



function filterProjectsByEmployeeSkills(): IProject[] {
    const employee = employees.find((e) => e.id === id)
    return projects.filter(project => {
        const isEmployeeAssigned = project.assignedEmployees.includes(employee!.id);

        const hasMatchingSkill = project.requiredSkills.some(requiredSkill => {
            return employee?.skills.some(employeeSkill => 
                employeeSkill.skillId === requiredSkill.skillId && employeeSkill.level === requiredSkill.level
            );
        });

        return !isEmployeeAssigned && hasMatchingSkill;
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
            const project = formJson.proyecto;

            addNewEmployeeInProject(id, project.toString());

            handleClose();
          },
        }}
      >
        <DialogTitle>Añadir una nueva habilidad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Añade una nueva habilidad para que todos los usuarios vean tus
            nuevos logros en el desarrollo de software y los encargados de
            proyectos y administradores te puedan asignar a nuevos proyectos
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
                  <MenuItem value={p.id}>{p.name}</MenuItem>
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
