import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Buscar,
  Error404,
  InventarioSkills,
  LateralMenu,
  Login,
  Perfil,
  Proyectos,
} from "./components";
import { Provider } from "./context/Provider";
import { PrivateContent } from "./components/priveteContent/PrivateContent";
function App() {
  return (
    <main className="container">
      <BrowserRouter>
        <LateralMenu>
          <Provider>
            <Routes>
              <Route path="/" element={
                <PrivateContent>
                  <Buscar />
                </PrivateContent>
              } />
              <Route path="/perfil" element={
                <PrivateContent>
                  <Perfil />
                </PrivateContent>
              } />
              <Route path="/inventario-skill" element={
                <PrivateContent>
                  <InventarioSkills />
                </PrivateContent>
              } />
              <Route path="/proyectos" element={
                <PrivateContent>
                  <Proyectos />
                </PrivateContent>
              } />
              <Route path="*" element={<Error404 />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Provider>
        </LateralMenu>
      </BrowserRouter>
    </main>
  );
}

export default App;
