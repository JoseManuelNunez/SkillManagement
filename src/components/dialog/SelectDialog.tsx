import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../../context/Context";
import { INewSkillEmployee, ISkill } from "../../context/types";

export const SelectDialog = () => {
  const { skills, employeeSkills, addNewEmployeeSkill } = useContext(Context);
  

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="success"
        sx={{ float: "right", mr: 10, mt: 2 }}
        onClick={handleClickOpen}
      >
        Añadir Nueva Skill
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
            const skill = formJson.skill;
            const nivel = formJson.nivel;
            const newEmployeeSkill: INewSkillEmployee = {
              skillId: skill.toString(),
              level: nivel.toString()

            }
            addNewEmployeeSkill(newEmployeeSkill);

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
          <FormControl fullWidth sx={{mb: 1, mt: 1}}>
            <InputLabel id="demo-simple-select-label">Skill</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Skill"
              name="skill"
              required
            >
              {skills
                .filter((s: ISkill) => !employeeSkills.includes((s.id)))
                .map((skill) => (
                  <MenuItem value={skill.id}>{skill.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Nivel</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Nivel"
              name="nivel"
              required

            >
                  <MenuItem value={"Basico"}>Basico</MenuItem>
                  <MenuItem value={"Intermedio"}>Intermedio</MenuItem>
                  <MenuItem value={"Avanzado"}>Avanzado</MenuItem>

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
  );
};
