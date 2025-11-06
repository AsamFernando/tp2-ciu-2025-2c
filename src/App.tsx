import { Layout } from './components';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {Home, IniciarSesion, Registro, Perfil, PostDetalle, Publicar, Publicaciones} from './pages';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Contexts";
import type { UserLogueadoType } from "./Types/Types";
import { userLogueadoDefault } from './Contexts/default/userDefault';

function App() {
  const {user, setUser} = useContext(UserContext);
  const localStorageUserKey = 'userLogueado';
  const [postDetalle, setPostDetalle] = useState<any>({})
  const navigate = useNavigate()

  const verDetallePost = (post:any) => {
    setPostDetalle(post)
    navigate('/Post')
  }
  
  useEffect(() => {
    const userLogueado = localStorage.getItem(localStorageUserKey);
    if(userLogueado) setUser(JSON.parse(userLogueado))
  },[]);

  const login = (userLogueado:UserLogueadoType) => {
    localStorage.setItem(localStorageUserKey, JSON.stringify(userLogueado))
    setUser(userLogueado)
  }
  
  const logout = () => {
    localStorage.removeItem(localStorageUserKey)
    setUser(userLogueadoDefault)
  }

  if(!user.logueado) {
    return (
      <Routes>
        <Route path="/" element={<IniciarSesion login={login} />} />
        <Route path="/Iniciar Sesion" element={<IniciarSesion login={login} />} />
        <Route path="/Registro" element={<Registro login={login} />} />
        <Route path="/*" element={ <Navigate to="/" /> } />
      </Routes>
    );
  };
  
  return (
    <>
      <Routes>
        <Route element={<Layout logout={logout} />}>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Perfil" element={<Perfil verDetallePost={verDetallePost}/>} />
          <Route path="/Post" element={<PostDetalle post={postDetalle} />} />
          <Route path="/Publicar" element={<Publicar />} />
          <Route path="/Publicaciones" element={<Publicaciones />} />
          <Route path="/*" element={ <Navigate to="/" /> } />
        </Route>
      </Routes>
    </>
  );
};

export default App;

/* --Comentarios--
con useEffect le paso un array vacio de dependencias para q ejecute la funcion cada vez q se
actualiza la pagina en el navegador y cargue en el useContext el usuario si hay uno logueado en localStorage
si no mantiene en el estado el q esta por defecto con la propiedad logueado en false, mostrando las rutas que
corresponden a un user sin sesion iniciada

las funciones de login y logout no las pongo en el contexto ya q son de uso particular
del navbar con el boton cerrar sesion y de la page iniciar sesion
las funciones de login y logout son recibidas por props por los componentes iniciarSesion y navbar
que ejecutan el guardado del user en el contexto y localstorage para el login y 
el borrado de ambos en el logout
*/
