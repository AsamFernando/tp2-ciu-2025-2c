import {PostPerfil} from '../../components';
import { useEffect, useState } from 'react';
import { getPostImages } from '../../api/images';
import { getPostComments } from '../../api/comments';
import type { imageBDType, postBDType, verDetallePostType, commentBDType } from '../../Types/Types';

const Post = ({post, verDetallePost}:{post:postBDType, verDetallePost:verDetallePostType}) => {
    const [images, setImages] = useState<imageBDType[]>([])
    const [comments, setComments] = useState<commentBDType[]>([])

    //hacer una funcion generica
    const getImages = async () => {
        try {
            const postImages = await getPostImages(post.id)
            return postImages
        } catch (error:any) {
            console.log("Error del servidor: ", error.message)
            return error
        }
    }
    //hacer una funcion generica
    const getComments = async () => {
        try {
            const postComments = await getPostComments(post.id)
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

    //copiar estilos de hover de tp1 ${styles.cardHover}
    //accion boton lleva a ver el detalle de cada post con el id del post cargo los datos en la page Post
    return <PostPerfil post={post} accionBtn={verDetallePost} images={images} comments={comments} />
};

export default Post;