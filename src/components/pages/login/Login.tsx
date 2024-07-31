import style from "./login.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = () => {
  const {employees} = useContext(Context)
  const navegate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.name;
    const password = formJson.password;

    const employee = employees.find((e) => e.name === name && e.password === password)

    if (employee) {
      localStorage.setItem("token", JSON.stringify(employee.id))
      navegate('/')
      
      console.log(employee)

    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El nombre de usuario o la contraseña no coinciden",
      });
    }

  };

  return (
    <main className={style.mainContainer}>
      <div className={style.loginContainer}>
        <img src="/sm.png" alt="" />
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Nombre de usuario"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              fullWidth
              variant="outlined"
            />
          </FormGroup>
        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 2, ml: 15, width: '50%', fontSize: 20 }}
          color="primary"
          >
          Login
        </Button>
          </form>
      </div>
    </main>
  );
};
