import {Card, ListGroup, Badge, Button, Container, Form} from 'react-bootstrap'
import {CarouselPostImages} from '../../components';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../Contexts';
import { commentSchema } from '../../schemas/CommentSchema';
import { createComment } from '../../api/comments';
import { useNavigate } from 'react-router-dom';

const AgregarComment = ({handleSubmit, label, errores, ...rest}:any) => {
    return (
        <div className="form-floating text-align-center mb-3">
                <br />
                <Form noValidate className="form-control-sm" onSubmit={handleSubmit}>
                    <Form.Group className="mb-2" controlId="formComment">
                        <Form.Control
                            {...rest}
                            size='md'
                            type="text"
                            isInvalid={!!errores?.[rest.name]}
                            />
                        {/* <label style={{margin:1, padding:'2.3rem 0.8rem'}} htmlFor={controlId}>{label}</label> */}
                        <Form.Control.Feedback type="invalid">
                            {errores?.[rest.name]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button onClick={handleSubmit} size='sm'>
                        Publicar
                    </Button>
                </Form>
            </div>
    )
}

const PostCompleto = ({postId, description, Tags, images, comments}:any) => {
    const {user} = useContext(UserContext)
    const [comentarioNuevo, setComentarioNuevo] = useState<any>("")
    const [errores, setErrores] = useState<any>({})
    const cambioEnForm = useRef(false);
    const cantidadComments = comments.length
    const navigate = useNavigate()

    const validateSchema = async (schema:any) => {
        try {
            await schema.validate({comentarioNuevo}, {abortEarly:false})
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
        const validar = async () => await validateSchema(commentSchema)
        if(cambioEnForm.current) {
            validar()
        }
        else {
            cambioEnForm.current=true
        }
    },[comentarioNuevo])

    //mesaje Alert de exito de creacion o fallo
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const commentValido = await validateSchema(commentSchema)
        if(commentValido) {
            await createComment({content:comentarioNuevo, userId:user.id, postId})
            setErrores({})
        }
    };
   
    const mostrarTags = () => {
        console.log(Tags)
        return (
            Tags.map((tag:any, i:any) => (
                <Badge
                    key={i}
                    pill
                    bg='warning'
                    style={{color:'black', marginBottom:'1rem', borderColor:"white"}}
                >
                    {tag.name}
                </Badge>
            ))
        )
    }

    const handleChange = (e:any) => {
        const inputSinEspacios = e.target.value.trim()
        setComentarioNuevo(inputSinEspacios)
    }

    const propsInputsComment = {
        label:"Ingresa tu comentario",
        placeholder:"Ingresa tu comentario",
        name:'comentarioNuevo',
        onChange:handleChange,
        errores
    }


    //copiar estilos de hover de tp1 ${styles.cardHover}
    //ver los comentarios
    //cambiar tamaño de la card
    return (
        <Container className='d-flex align-items-center justify-content-center'>
            <Card className={`text-center rounded`} style={{ width: '25rem', marginTop:'1rem'}}>
                <CarouselPostImages images={images}/>
                <Card.Body>
                    <ListGroup variant='flush'>
                    <Card.Title>{`Titulo Post de ${user.nickName}`}</Card.Title>
                        <ListGroup.Item>
                            {`Descripcion: `}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {`Tags: `}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {mostrarTags()}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <AgregarComment handleSubmit={handleSubmit} {...propsInputsComment} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {`${cantidadComments} Comentario${cantidadComments>1?'s':''} `}
                        </ListGroup.Item>
                        {comments.map((comment:any, i:number) => (
                            <ListGroup.Item key={i}>
                                {comment.content}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PostCompleto;