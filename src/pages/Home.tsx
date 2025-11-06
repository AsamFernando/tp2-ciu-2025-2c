import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../Contexts";
import { Container, Row, Col } from "react-bootstrap";
import { Post } from "../components";
import { getPosts } from "../api/posts";


const Home = ({verDetallePost}:any) => {
    const {user} = useContext(UserContext);
    const [posts, setPosts] = useState<any[]>([])
    const cambioEnForm = useRef(false);

    const getOthersPosts = async () => {
        try {
            const allPosts = await getPosts()
            return allPosts.filter((post:any) => post.UserId != user.id)
        } catch (error:any) {
            console.log("Error del servidor: ", error.message)
            return error
        }
    }

    useEffect(() => {
        const cargaPosts = async () => {
            const othersPosts = await getOthersPosts()
            setPosts(othersPosts)
        }
        cargaPosts();
    },[])

    return (
        <Container>
            <h2>{`Bienvenido/a ${user.nickName}`}</h2>
            <Row className="justify-content-md-center">
                {posts.length === 0 ? (<p>No hay posts recientes.</p>) : (
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

export default Home;