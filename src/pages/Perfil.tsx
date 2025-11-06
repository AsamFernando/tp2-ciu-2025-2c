import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts";
import { getUserPosts } from "../api/posts";
import { Col, Container, Row } from "react-bootstrap";
import { Post } from "../components";

//mostrar las publicacion cada una en todo el ancho dela pantalla

const Perfil = ({verDetallePost}:any) => {
    const {user} = useContext(UserContext);
    const [posts, setPosts] = useState<any[]>([])

    const getPosts = async () => {
        try {
            const userPosts = await getUserPosts(user.id)
            return userPosts
        } catch (error:any) {
            console.log("Error del servidor: ", error.message)
            return error
        }
    }

    useEffect(() => {
        const cargaPosts = async () => {
            const usePosts = await getPosts()
            setPosts(usePosts)
        }
        cargaPosts();
    },[])

    return (
        <Container>
        <h2>{`Perfil de ${user.nickName}`}</h2>
        <Row className="justify-content-md-center">
            {posts.length === 0 ? (<p>No hay posts todavia.</p>) : (
                posts.map((post, i) => (
                    <Col
                        key={i}
                        className="d-flex justify-content-center"
                        xs={12} md={4} sm={6} lg={6} xl={6}
                    >
                        {<Post post={post} verDetallePost={verDetallePost} />}
                    </Col>
                ))
            )}
        </Row>
        </Container>
    )
};

export default Perfil;