import { useEffect, useState } from "react";
import { PostCompleto } from '../components'
import { getPostComments } from "../api/comments";
import { getPostImages } from "../api/images";

const PostDetalle = ({post}:any) => {
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

    return (
        <>
            <h3 className="text-center" style={{marginTop:'2rem'}}>Detalle de Publicacion</h3>
            <PostCompleto postId={id} description={description} Tags={Tags} images={images} comments={comments} />
        </>
    )
};

export default PostDetalle;