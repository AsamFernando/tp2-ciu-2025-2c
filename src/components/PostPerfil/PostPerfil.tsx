import {Card, ListGroup, Badge, Button, Container} from 'react-bootstrap'
import {CarouselPostImages} from '../../components';
import { useContext } from 'react';
import { UserContext } from '../../Contexts';

const PostPerfil = ({post, images, comments, accionBtn}:any) => {
    const {user} = useContext(UserContext)
    const {description, Tags} = post
    const cantidadComments = comments.length
    
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
                            {`${cantidadComments} Comentario${cantidadComments>1?'s':''} `}
                        </ListGroup.Item>
                    </ListGroup>
                    <Button onClick={()=>{accionBtn(post)}}>
                        Ver mas
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PostPerfil;