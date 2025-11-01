import {Button, Form, FloatingLabel, Row, Col, Container, Image, Stack} from 'react-bootstrap';
import { useState } from "react";
import { useNavigate, Link} from 'react-router-dom';
import type { loginProps, userBD } from '../Types/Types';
import '../estilos/estilos.css';

//metemos usestate con onchange para todo a dos manos
//handleSubmit
//seteo si cumple la validacion el user en el contexto y en el localstorage con la funcion y redirijo a home
//luego en app.jsx puedo tomar el user del localstorage si actualizo la pag o cierro el navegador o la pestaña

//Tareas
//Hacer validaciones si esta mal nickName y/o contraseña
//contra numerica y longitud tambien para nick
//hacer registro tambien con validaciones y redireccion

const IniciarSesion = ({login}:loginProps) => {
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
        <Form className="form-control-sm" onSubmit={handleSubmit}>
            <Container fluid className='min-vh-100 d-flex justify-content-center align-items-center'>
                <Row className='align-items-center'>
                    <Col className='align-items-center'>
                        <Image style={{marginBottom:'1.5rem', marginTop:'1.5rem'}} height={300} width={400} src="../src/assets/Anti-Social-Net-gta.png" rounded fluid/>
                            <Form.Group className="mb-2" controlId="formNickName">
                                <FloatingLabel
                                    controlId="floatingInputNick"
                                    label="Ingresa tu nick"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="Ingresa tu nick" onChange={(e) => setNickName(e.target.value)}/>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="formBasicPassword">
                                <FloatingLabel
                                    controlId="floatingInputContra"
                                    label="Contraseña"
                                    className="mb-3"
                                >
                                    <Form.Control type="password" placeholder="Contraseña" onChange={(e) => setContraseña(Number(e.target.value))} />
                                </FloatingLabel>
                            </Form.Group>
                        <Button variant="warning" type="submit" className='w-100' style={{fontWeight:'bold'}}>
                            Iniciar Sesion
                        </Button>
                        <p style={{marginTop:'1rem'}}>No tenes una cuenta? {<Link to='/Registro'>Registrate acá</Link>}</p>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
}

export default IniciarSesion;