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
import { ISkill } from "../../context/types";

export const FormDiaglog = () => {
  const { skills, createNewSkill, employee } = useContext(Context);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateNewSkill = (name: string, description: string): boolean => {
    const skillName = skills.find((s) => s.name === name);
    const skillDescription = skills.find((s) => s.description === description);

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
        Crear Nueva Skill
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
            if (validateNewSkill(name.toString(), desciption.toString())) {
              const newSkill: ISkill = {
                id: uuidv4(),
                name: name.toString(),
                description: desciption.toString(),
              };
              createNewSkill(newSkill);
            }

            handleClose();
          },
        }}
      >
        <DialogTitle>Crear una nueva habilidad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Crea una nueva habilidad y añadele una descripcion para que todos
            los usuarios tengan acceso a ella y puedan elegirla en su perfil
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
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
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
