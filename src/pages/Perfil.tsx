import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts";
import { getUserPosts } from "../api/posts";
import { Col, Container, Row } from "react-bootstrap";
import { Post } from "../components";
import type { postBDType, verDetallePostType } from "../Types/Types";

//mostrar las publicacion cada una en todo el ancho dela pantalla

const Perfil = ({ verDetallePost }: { verDetallePost: verDetallePostType }) => {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState<postBDType[]>([])

    const getPosts = async () => {
        try {
            const userPosts = await getUserPosts(user.id)
            return userPosts
        } catch (error: any) {
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
    }, [user.id])

    return (
        <Container>
            <h2>{`Perfil de ${user.nickName}`}</h2>
            <Row className="justify-content-center g-4">
                {posts.length === 0 ? (<p>No hay posts todavia.</p>) : (
                    posts.map((post, i) => (
                        <Col
                            key={i}
                            className="d-flex justify-content-center"
                            xs={12} sm={6} md={6} lg={4} xl={4}  
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