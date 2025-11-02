import {Button, Form, FloatingLabel, Row, Col, Container, Image} from 'react-bootstrap';
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link} from 'react-router-dom';
import type { loginProps, inputsLoginType} from '../Types/Types';
import '../estilos/estilos.css';
import {loginSchema, inputSchema} from '../schemas/LoginSchema';
import { getUserByNickName } from '../api/users';
import { FormInput } from '../components';

const IniciarSesion = ({login}:loginProps) => {
    const [formulario, setFormulario] = useState<{nickName:string, contraseña:string}>({nickName:"", contraseña:""})
    const [errores, setErrores] = useState<any>({})
    const cambioEnForm = useRef(false);
    const navigate = useNavigate()

    const handleChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name} = e.target;
        setFormulario({...formulario, [name]:e.target.value})
    };

    const validateSchema = async (schema:any) => {
        try {
            await schema.validate(formulario, {abortEarly:false})
            setErrores({})
            return true;
        } 
        catch (error:any) {
            const newErrors:any = {}
            for(let newError of error.inner) {
                newErrors[newError.path] = newError.message
            }
            setErrores(newErrors)
            return false;
        };
    };

    useEffect(() => {
        const validar = async () => await validateSchema(inputSchema)
        if(cambioEnForm.current) {
            validar()
        }
        else {
            cambioEnForm.current=true
        }
    },[formulario])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const loginValido = await validateSchema(loginSchema)
        if(loginValido) {
            const userFound = await getUserByNickName(formulario.nickName)
            login({...userFound, logueado:true})
            navigate('/home')
            setErrores({})
        }
    };

    const propsInputsLogin = [
        {controlId:"floatingInputNick", label:"Ingresa tu nick", placeholder:"Ingresa tu nick", name:'nickName', onChange:handleChange, errores},
        {controlId:"floatingInputContra", label:"Contraseña", placeholder:"Contraseña", name:'contraseña', onChange:handleChange, errores},
    ];

    return (
        <Form noValidate className="form-control-sm" onSubmit={handleSubmit}>
            <Container fluid className='min-vh-100 d-flex justify-content-center align-items-center'>
                <Row className='align-items-center'>
                    <Col className='align-items-center'>
                        <Image style={{marginBottom:'1.5rem', marginTop:'1.5rem'}} height={300} width={400} src="../src/assets/Anti-Social-Net-gta.png" rounded fluid/>
                            <Form.Group className="mb-2" controlId="formLogin">
                                {propsInputsLogin.map((props, i) => <FormInput key={i} {...props} />)}
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

/* --Comentarios--
metemos usestate con onchange para todo a dos manos
handleSubmit
seteo si cumple la validacion el user en el contexto y en el localstorage con la funcion y redirijo a home
luego en app.jsx puedo tomar el user del localstorage si actualizo la pag o cierro el navegador o la pestaña

Tareas
Hacer validaciones si esta mal nickName y/o contraseña --> hecho
contra string y longitud tambien para nick --> hecho
hacer registro tambien con validaciones y redireccion
Poner en el boton un circulito de cargando cuando se hace click
validaciones con estados del formulario y errores --> hecho

useEffect para validar luego del primer render con useRef --> hecho
validateLogin valida los campos pero no si el user existe en bd con inputSchema --> hecho
con loginSchema valido si el userExiste en bd en onSubmit --> hecho
*/