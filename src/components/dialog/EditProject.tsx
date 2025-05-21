import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions, IconButton,
} from "@mui/material";
import React, { useContext } from "react";
import { IProject } from "../../context/types";
import EditIcon from "@mui/icons-material/Edit";
import { Context } from "../../context/Context";
import { showBasicAlert } from "../../alerts/alerts";

export const EditProject = ({project}:{project: IProject}) => {
  const { getSkill, employee } = useContext(Context);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateProjectChange = (name: string, description: string): boolean => {
    const projectName = name === project.name;
    const projectDescription = description === project.description;

    return !projectName || !projectDescription;
  };

  const editSkill = async (name: string, description: string) => {
    await fetch(`http://localhost:3000/projects/${project.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        description,
      }),
    }).then(() => {
      showBasicAlert("Skill Actualizada", "La skill a sido actualizada correctamente")
      getSkill();
    });
  };

  return (
    <React.Fragment>
      <IconButton color="primary" disabled={employee.role !== 'admin'} onClick={handleClickOpen}>
        
      <EditIcon  />
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
            const name = formJson.name;
            const desciption = formJson.description;
            if (validateProjectChange(name.toString(), desciption.toString())) {
              editSkill(name.toString(), desciption.toString());
              handleClose();
            } 
          },
        }}
      >
        <DialogTitle>Edita esta habilidad habilidad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edita esta habilidad y Edita la descripcion para que todos los
            usuarios tengan acceso a ella y puedan elegirla en su perfil
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            defaultValue={skill.name}
            id="name"
            name="name"
            label="Nombre habilidad"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            defaultValue={skill.description}
            id="desciption"
            name="description"
            label="Descipcion habilidad"
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
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
