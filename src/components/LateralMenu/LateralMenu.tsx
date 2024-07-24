import style from "./menu.module.css";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ApartmentIcon from "@mui/icons-material/Apartment";
import logo from "../../assets/sm.png";
import { IListMenu, listMenu } from "../../utils/listMenu";
import { useNavigate } from "react-router-dom";

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

  return (
    <main className={style.mainContainer}>
      <section className={style.menuContainer}>
        <img src={logo} className={style.img} alt="sadsad" />
        <div className={style.menuList}>
          {listMenu.map((menu: IListMenu) => (
            <div
              key={menu.name}
              style={ window.location.pathname === menu.url ? { backgroundColor: '#fff', width: '80%', borderRadius: '10px 0 0 10px', padding: '10px 50px', transition: 'all 1s'} : {}}
              className={style.menuItem}
              onClick={() => navegate(menu.url)}
            >
              <div>{renderIcon(menu.name)}</div>
              <h3>{menu.name}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className={style.AppContainer}>{children}</section>
    </main>
  );
};
