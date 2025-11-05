import {Button, Form, Row, Col, Container} from 'react-bootstrap';
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import type {postBD, handleClickPropsType} from '../Types/Types';
import '../estilos/estilos.css';
import { descripcionUrlSchema, imagenSchema} from '../schemas/PublicarSchema';
import { FormInput, MostrarTags, MostrarImagenes} from '../components';
import { UserContext } from '../Contexts';
import tagsContext from '../Contexts/TagsContext';
import { getTags } from '../api/tags';

const Publicar = () => {
    const {tags, setTags} = useContext(tagsContext)
    const {user} = useContext(UserContext)
    const [formulario, setFormulario] = useState<postBD>({descripcion:"", userId:user.id, tags:[]})
    const [descripcionUrl, setDescripcionUrl] = useState<{descripcion:string, url:string}>({descripcion:"", url:""})
    const [tagIds, setTagIds] = useState<number[]>([])
    const [url, setUrl] = useState<string>("")
    const [urls, setUrls] = useState<string[]>([])
    const [descripcion, setDescripcion] = useState<string>("")
    const [errores, setErrores] = useState<any>({})
    const cambioEnForm = useRef(false);
    const navigate = useNavigate()

    const handleDescripcion = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputSinEspacios = e.target.value.trim()
        setDescripcion(inputSinEspacios)
    };
    const handleUrl = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputSinEspacios = e.target.value.trim()
        setUrl(inputSinEspacios)
    };
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name} = e.target;
        const inputSinEspacios = e.target.value.trim()
        setDescripcionUrl({...descripcionUrl, [name]:inputSinEspacios})
    };

    
    const handleChangeArray = async (e:React.ChangeEvent<HTMLInputElement>) => {
        // const {name} = e.target;
        // const key = name as keyof postBD;
        // const inputSinEspacios = e.target.value.trim()
        // setFormulario({...formulario, [key]:[...formulario[key], inputSinEspacios]})
    };

    //ver tipo de schema y de estado
    const validateSchema = async (schema:any, estado:{descripcion:string}|{url:string}) => {
        try {
            await schema.validate(estado, {abortEarly:false})
            setErrores({})
            return true;
        } 
        catch (error:any) {
            const newErrors:any = {}
            for(let newError of error.inner) {
                newErrors[newError.path] = newError.message
            }
            // console.log(newErrors)
            setErrores(newErrors)
            return false;
        };
    };

    const handleCargarImagen = async () => {
        const urlValida = await validateSchema(imagenSchema, {url})
        console.log(urlValida && url != "")
        if(urlValida && url != "") setUrls([...urls, url])
    }

    const handleQuitarImagen = (urlBorrar:string) => {
        const urlFiltradas = urls.filter(url => url != urlBorrar)
        setUrls(urlFiltradas)
    }

    useEffect(() => {
        const validar = async () => await validateSchema(descripcionUrlSchema, descripcionUrl)
        if(cambioEnForm.current) {
            validar()
        }
        else {
            cambioEnForm.current=true
        }
    },[descripcionUrl])

    useEffect(() => {
        const cargaTags = async () => {
            const existingTags = await getTags()
            setTags(existingTags)
        }
        cargaTags();
    },[])

    const quitarTag = (tagId:number) => {
        return tagIds.filter(id => id != tagId)
    }
    const añadirTag = (tagId:number) => {
        return [...tagIds, tagId]
    }

    const añadirOQuitarTag = (tagIdConSeleccion:handleClickPropsType) => {
        const {id, seleccionado} = tagIdConSeleccion
        return seleccionado ? añadirTag(id) : quitarTag(id)
    }

    const handleClick = (tagIdConSeleccion:handleClickPropsType) => {
        const nuevosTagsSeleccionados = añadirOQuitarTag(tagIdConSeleccion)
        setTagIds(nuevosTagsSeleccionados)
        console.log(tagIds)//borrar
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        // if(userValido) {
        //     const userCreated = await createUser(formulario)
        //     //login({...userCreated, logueado:true})
        //     navigate('/Perfil')
        //     setErrores({})
        // }
    };
    
    //Poner el boton al lado del input
    const propsInputsPost = [
        {controlId:"floatingInputDescripcion", label:"Ingresa la descripcion", placeholder:"Ingresa la descripcion", name:'descripcion', onChange:(e:React.ChangeEvent<HTMLInputElement>) => {handleChange(e); handleDescripcion(e);}, onClick:()=>{}, errores},
        {controlId:"floatingInputUrls", label:"Ingresa la url de la imagen", placeholder:"Ingresa la url de la imagen", name:'url', onChange:(e:React.ChangeEvent<HTMLInputElement>) => {handleChange(e); handleUrl(e);}, onClick:() => {handleCargarImagen()}, errores},
    ];

    return (
        <Form noValidate className="form-control-sm" onSubmit={handleSubmit}>
            <Container fluid className='min-vh-100 d-flex justify-content-center align-items-center'>
                <Row className='align-items-center'>
                    <Col className='align-items-center'>
                                <>
                                    <h1 className='text-center'>Nueva Publicacion</h1>
                                    {propsInputsPost.map((props, i) => (
                                        <Form.Group key={i} className="mb-3" controlId={props.controlId}>
                                            <FormInput {...props} />
                                        </Form.Group>
                                    ))}
                                    <h4 className='text-center'>Imagenes Cargadas</h4>
                                    <MostrarImagenes urls={urls} handleClick={handleQuitarImagen} />
                                    <h4 className='text-center'>Tags</h4>
                                    <MostrarTags handleClick={handleClick} />
                                    <br />
                                </>
                        <Button variant="success" type="submit" className='w-100' style={{fontWeight:'bold', marginBottom:'1.5rem'}}>
                            Crear Post
                        </Button>
                        <Button variant="danger" className='w-100' style={{fontWeight:'bold'}} onClick={() => navigate('/Perfil')}>
                            Cancelar Edicion
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
};

export default Publicar;

/* --Comentarios--
con as userBD le digo q el objeto vacio tiene ese tipo
con input as keyof userBd le digo q cada key del objeto vacio va a
coincidir con el tipo de las keys de userBD al darle al boton de cancelar
edicion tiene q salir un cartel que diga Cancelar y volver a tu perfil?
perderas todos los cambios aceptar cancelar ver si hay q borrar los estados
*/