import {Card, ListGroup, Badge, Button, Container} from 'react-bootstrap'
import {CarouselPostImages} from '../../components';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts';

const PostCompleto = ({description, Tags, images, comments}:any) => {
    const {user} = useContext(UserContext)
    
    const mostrarTags = () => {
        console.log()
        return (
            (Tags || []).map((tag:any, i:any) => (
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
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PostCompleto;