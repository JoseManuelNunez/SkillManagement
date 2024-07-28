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
import { ISkill } from "../../context/types";
import EditIcon from "@mui/icons-material/Edit";
import { Context } from "../../context/Context";

export const EditDialog = ({ skill }: { skill: ISkill }) => {
    const { getSkill } = useContext(Context)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateNewSkill = (name: string, description: string): boolean => {
    const skillName = name === skill.name;
    const skillDescription = description === skill.description;
    console.log(!skillName && !skillDescription)

    return !skillName || !skillDescription;
  };

  const editSkill = async (name:string, description: string) => {
    await fetch(`http://localhost:3000/skills/${skill.id}`, {
        method: "PUT",
        body: JSON.stringify({
            name,
            description
        })
    }).then(() => {
        getSkill()
    })
  }

  return (
    <React.Fragment>
      <EditIcon onClick={handleClickOpen} />

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
                editSkill(name.toString(), desciption.toString())
            }
            
            handleClose();
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
};
