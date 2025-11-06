import {Card, ListGroup, Badge, Button, Container} from 'react-bootstrap'
import {CarouselPostImages} from '../../components';
import { useContext, useEffect, useState } from 'react';
import { TagsContext, UserContext } from '../../Contexts';
import { getPostImages } from '../../api/images';
import { getPostComments } from '../../api/comments';

const Post = ({post}:any) => {
    const {user} = useContext(UserContext)
    const [images, setImages] = useState<any[]>([])
    const [comments, setComments] = useState<any[]>([])
    const {id, description, Tags} = post

    //hacer una funcion generica
    const getImages = async () => {
        try {
            const postImages = await getPostImages(id)
            return postImages
        } catch (error:any) {
            console.log("Error del servidor: ", error.message)
            return error
        }
    }
    //hacer una funcion generica
    const getComments = async () => {
        try {
            const postComments = await getPostComments(id)
            return postComments
        } catch (error:any) {
            console.log("Error del servidor: ", error.message)
            return error
        }
    }

    useEffect(() => {
        const cargaImages = async () => {
            const postImages = await getImages()
            setImages(postImages)
        }
        cargaImages();
    },[])
    useEffect(() => {
        const cargaComments = async () => {
            const postComments = await getComments()
            setComments(postComments)
        }
        cargaComments();
    },[])

    const mostrarTags = () => {
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

    //copiar estilos de hover de tp1 ${styles.cardHover}
    //accion boton lleva a ver el detalle de cada post con el id del post cargo los datos en la page Post
    return (
        <Container className='d-flex align-items-center justify-content-center'>
            <Card className={`text-center rounded`} style={{ width: '25rem', marginTop:'1rem'}}>
                {/* <Card.Img variant="top" src={`${producto.imagen}`} height={200} width={300} /> */}
                <CarouselPostImages images={images}/>
                <Card.Body>
                    <ListGroup variant='flush'>
                    <Card.Title>{`Titulo Post de ${user.nickName}`}</Card.Title>
                        <ListGroup.Item>
                            {description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {`Tags: `}
                            {mostrarTags()}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {`${comments.length} Comentarios `}
                        </ListGroup.Item>
                    </ListGroup>
                    <Button variant='success' size='sm'>
                        Ver mas
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Post;