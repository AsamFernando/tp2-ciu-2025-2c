import {Button, Form, FloatingLabel} from 'react-bootstrap';
import { useContext } from "react";
import { UserContext } from "../Contexts";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type userBD = {
    nickName:string,
    email:string
}

//usar localstorage para mantener la sesion aunque se actualice la pagina 
//o se cierre el navegador o la pestaña
//hacer logout borrando los estados localstorage y redirigiendo a inicio de sesion

const IniciarSesion = () => {
    // metemos usestate con onchange para todo a dos manos
    const {user, setUser} = useContext(UserContext);
    const [nickName, setNickName] = useState<string>("")
    const [contraseña, setContraseña] = useState<number>(0)

    const obtenerUsers = async () => {
        const data = await fetch('http://localhost:3001/users')
        const users = await data.json()
        return users.find((u:userBD) => u.nickName == nickName)
    }

    const navigate = useNavigate()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userFound = await obtenerUsers()
        if(userFound && contraseña == 1234) {
            setUser({nickName, logueado:true})
            navigate('/home')
        }
        else {
            console.log('contraseña o nickName invalido')
        }
        console.log(user)
    }

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