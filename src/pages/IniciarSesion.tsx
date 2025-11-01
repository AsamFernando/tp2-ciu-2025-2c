import {Button, Form, FloatingLabel} from 'react-bootstrap';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import type { loginProps, userBD } from '../Types/Types';

// const sesionStorage = window.localStorage;

//usar localstorage para mantener la sesion aunque se actualice la pagina 
//o se cierre el navegador o la pestaña
//hacer logout borrando los estados localstorage y redirigiendo a inicio de sesion

const IniciarSesion = ({login}:loginProps) => {
    // metemos usestate con onchange para todo a dos manos
    const [nickName, setNickName] = useState<string>("")
    const [contraseña, setContraseña] = useState<number>(0)
    const navigate = useNavigate()

    const userRegistrado = async () => {
        try {
            const response = await fetch('http://localhost:3001/users')
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const users = await response.json()
            return users.find((u:userBD) => u.nickName == nickName)
        }
        catch (error:any) {
            console.log("Error del servidor: ", error.message)
        }
    };

    //seteo si cumple la validacion el user en el contexto y en el localstorage con la funcion y redirijo a home
    //luego en app.jsx puedo tomar el user del localstorage si actualizo la pag o cierro el navegador o la pestaña
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userFound = await userRegistrado()
        if(userFound && contraseña == 1234) {
            const userLogueado = {...userFound, logueado:true}
            login(userLogueado)
            navigate('/home')
        }
        else {
            console.log('contraseña o nickName invalido')
        };
    };

    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNickName">
            <FloatingLabel
                controlId="floatingInputNick"
                label="Ingresa tu nick"
                className="mb-3"
            >
                <Form.Control type="text" placeholder="Ingresa tu nick" onChange={(e) => setNickName(e.target.value)}/>
            </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel
                controlId="floatingInputContra"
                label="Contraseña"
                className="mb-3"
            >
                <Form.Control type="password" placeholder="Contraseña" onChange={(e) => setContraseña(Number(e.target.value))} />
            </FloatingLabel>
        </Form.Group>
        <Button variant="primary" type="submit">
            Ingresar
        </Button>
        </Form>
    )
}

export default IniciarSesion;

// 'terminada logica de login y logout con localstorage y context'