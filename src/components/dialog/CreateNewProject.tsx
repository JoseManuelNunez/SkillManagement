import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../../context/Context";
import { v4 as uuidv4 } from "uuid";
import { IProject } from "../../context/types";


export const CreateNewProject = () => {
  const { projects, createNewProject, employee } = useContext(Context);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateNewProject = (name: string, description: string): boolean => {
    const skillName = projects.find((s) => s.name === name);
    const skillDescription = projects.find((s) => s.description === description);

    return !skillName && !skillDescription;
  };
  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="success"
        sx={{ float: "right", mr: 10, mt: 2 }}
        onClick={handleClickOpen}
        disabled={employee.role !== 'admin'}
      >
        Registrar nuevo proyecto
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.name;
            const desciption = formJson.description;
            if (validateNewProject(name.toString(), desciption.toString())) {
              const newProject: IProject = {
                id: uuidv4(),
                name: name.toString(),
                description: desciption.toString(),
                assignedEmployees: [],
                requiredSkills: [],
                estado: "desarrollo",
              };
              createNewProject(newProject);
            }

            handleClose();
          },
        }}
      >
        <DialogTitle>Registra un nuevo proyecto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Regrista un nuevo proyecto para gestionar el equipo y seguir de cerca su desarrollo
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nombre del proyecto"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="desciption"
            name="description"
            label="Descipcion del proyecto"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success">
            Registrar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
