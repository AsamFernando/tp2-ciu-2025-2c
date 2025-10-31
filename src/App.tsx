import { Layout } from './components';
import { Routes, Route, Navigate } from 'react-router-dom';
import {Home, IniciarSesion, Registro, Perfil, Post, Publicar} from './pages';
import { useContext } from "react";
import { UserContext } from "./Contexts";

function App() {
  const {user} = useContext(UserContext);
  
  if(!user.logueado) {
    return (
      <Routes>
        <Route path="/" element={<IniciarSesion />} />
        <Route path="/Iniciar Sesion" element={<IniciarSesion />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/*" element={ <Navigate to="/" /> } />
      </Routes>
    );
  };
  
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/Publicar" element={<Publicar />} />
          <Route path="/*" element={ <Navigate to="/" /> } />
        </Route>
      </Routes>
    </>
  );
};

export default App;
