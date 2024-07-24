import { AccountCircle } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import style from "./appbar.module.css";
import styled from "styled-components";

export const CustomAppBar = ({title, placeholder}:{title:string, placeholder:string}) => {
  const CostomInput = styled("input")({
    backgroundColor: "#F9F9F9",
    borderRadius: 20,
    border: "none",
    height: 15,
    width: 350,
    textAlign: "start",
    padding: "15px 15px 15px 40px ",
    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.35)",
    marginBottom: 15,
    zIndex: -999999,
  });

  return (
    <div className={style.appBarContainer}>
      <h1 className={style.title}>{title}</h1>
      <div className={style.actions}>
        <div>
          <SearchIcon
            sx={{ position: "relative", left: "10px", top: "40px" }}
          />
          <CostomInput placeholder={placeholder} />
        </div>
        <AccountCircle color="primary" sx={{ fontSize: 50, marginTop: 3 }} />
      </div>
    </div>
  );
};
