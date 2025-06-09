import { AccountCircle } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import style from "./appbar.module.css";

interface IProps {
  title: string
  placeholder: string
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

export const CustomAppBar = ({title, placeholder, searchValue, setSearchValue}:IProps) => {

  return (
    <div className={style.appBarContainer}>
      <h1 className={style.title}>{title}</h1>
      <div className={style.actions}>
        <div>
          <SearchIcon
            sx={{ position: "relative", left: "10px", top: "40px" }}
          />

           <input type="text" value={searchValue} className={style.customInput} placeholder={placeholder} onChange={((e) => setSearchValue(e.target.value))} />
        </div>
        <AccountCircle color="primary" sx={{ fontSize: 50, marginTop: 3 }} />
      </div>
    </div>
  );
};
