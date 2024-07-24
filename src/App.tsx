import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Buscar,
  Error404,
  InventarioSkills,
  LateralMenu,
  Perfil,
  Proyectos,
} from "./components";
function App() {


  return (
    <main className="container">
        <BrowserRouter>
      <LateralMenu>
          <Routes>
            <Route path="/" element={<Buscar />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/inventario-skill" element={<InventarioSkills />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
      </LateralMenu>
        </BrowserRouter>
    </main>
  );
}

export default App;
