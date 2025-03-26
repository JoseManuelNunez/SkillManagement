import style from "./menu.module.css";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { IListMenu, listMenu } from "../../utils/listMenu";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'

export const LateralMenu = ({ children }: { children: JSX.Element}) => {
  const navegate = useNavigate()


  const renderIcon = (menu: string) => {
    switch (menu) {
      case "Perfil":
        return <PersonIcon />;
      case "Buscar":
        return <SearchIcon />;
      case "Habilidades":
        return <BusinessCenterIcon />;
      case "Proyectos":
        return <ApartmentIcon />;
    }
  };

  const inLogin = () => {
    return window.location.pathname === '/login'
  }

  return (
    <main className={style.mainContainer}>
      <section className={ inLogin() ? style.menuContainerInLogin : style.menuContainer}>
        <img src='/sm.png' className={style.img} alt="sadsad" />
        <div className={style.menuList}>
          {listMenu.map((menu: IListMenu) => (
            <div
              key={menu.name}
              style={ window.location.pathname === menu.url ? { backgroundColor: '#fff', width: '80%', borderRadius: '10px 0 0 10px', padding: '10px 50px', transition: 'all 1s'} : {}}
              className={style.menuItem}
              onClick={() => navegate(menu.url)}
            >
              <div style={window.location.pathname === menu.url ? {color: '#000'} : {color: "#3267AC"}}>{renderIcon(menu.name)}</div>
              <h3 style={ window.location.pathname === menu.url ? {color: '#3267AC'} : {color: "#3267AC"}}>{menu.name}</h3> 
            </div>
          ))}
        </div>  
        <Button sx={{mt: 60}} variant="contained" color="error" onClick={() => [localStorage.removeItem('token'), navegate('/login'), window.location.reload()]}>
          Cerrar sesion
        </Button>
      </section>
      <section className={inLogin() ? style.AppContainerInLogin : style.AppContainer}>{children}</section>
    </main>
  );
};
