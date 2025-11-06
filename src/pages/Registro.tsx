import {Button, Form, Row, Col, Container, Image, Spinner, Alert} from 'react-bootstrap';
import { useEffect, useState, useRef } from "react";
import { useNavigate} from 'react-router-dom';
import type { loginProps, userBD} from '../Types/Types';
import '../estilos/estilos.css';
import {registroSchema, inputSchema} from '../schemas/RegistroSchema';
import { createUser } from '../api/users';
import { FormInput } from '../components';

const Registro = ({login}:loginProps) => {
    const [formulario, setFormulario] = useState<userBD>({id:0, nickName:"", email:""})
    const [errores, setErrores] = useState<any>({})
    const cambioEnForm = useRef(false);
    const navigate = useNavigate()

    const handleChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name} = e.target;
        const inputSinEspacios = e.target.value.trim()
        setFormulario({...formulario, [name]:inputSinEspacios})
    };
    //ver tipo de schema
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

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const userValido = await validateSchema(registroSchema)
            if(userValido) {
                const userCreated = await createUser(formulario)
                if (!userCreated) {
                    setErrores({auth: 'No se pudo crear el usuario. Verifica el servidor.'})
                    return
                }
                login({...userCreated, logueado:true})
                navigate('/Perfil')
                setErrores({})
            }
        }
        catch(err:any){
            setErrores({auth: err.message ?? 'Error desconocido'})
        }
        finally{
            setSubmitting(false)
        }
    };

    const propsInputsRegister = [
        {controlId:"floatingInputNick", label:"Ingresa tu nick", placeholder:"Ingresa tu nick", name:'nickName', onChange:handleChange, errores},
        {controlId:"floatingInputEmail", label:"Ingresa tu email", placeholder:"Email", name:'email', onChange:handleChange, errores},
    ];

    return (
        <Form noValidate className="form-control-sm" onSubmit={handleSubmit}>
            <Container fluid className='min-vh-100 d-flex justify-content-center align-items-center'>
                <Row className='align-items-center'>
                    <Col className='align-items-center'>
                        <Image style={{marginBottom:'1.5rem', marginTop:'1.5rem', maxWidth: '400px', width: '100%'}} src="../src/assets/Anti-Social-Net-gta.png" rounded fluid/>
                            <Form.Group className="mb-2" controlId="formRegister">
                                {propsInputsRegister.map((props, i) => <FormInput key={i} {...props} />)}
                            </Form.Group>
                        {errores?.auth && <Alert variant='danger'>{errores.auth}</Alert>}
                        <Button variant="success" type="submit" className='w-100' style={{fontWeight:'bold'}} disabled={submitting}>
                            {submitting ? (<><Spinner animation="border" size="sm"/> Creando...</>) : 'Crear Cuenta'}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
}

export default Registro;