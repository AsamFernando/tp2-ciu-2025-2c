import type { ReactNode } from "react";
import type { Dispatch, SetStateAction } from 'react';

export interface UserContextType {
    user:{
        id:number,
        nickName:string,
        email:string,
        logueado:boolean
    }
    setUser:React.Dispatch<React.SetStateAction<UserLogueadoType>>;
};

export interface TagsContextType {
    tags:TagType[]
    setTags:React.Dispatch<React.SetStateAction<TagType[]>>;
};

export interface UserLogueadoType {
    id:number,
    nickName:string,
    email:string,
    logueado:boolean
};

export type userBD = Omit<UserLogueadoType, 'logueado'>

export type postBD = {
    descripcion:string,
    userId:number
    tags:string[]
}

export type loginProps = {
    login:(userLogueado:UserLogueadoType) => void
};
export type cargarTagsProps = {
    cargarTags:(tags:TagType[]) => void
};

export type logoutProps = {
    logout:() => void
};

export interface Props {
    children:ReactNode
};

export interface inputsLoginType {
    controlId:string,
    label:string,
    placeholder:string,
    name:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void,
    errores:any
    onClick?:() => void
}

export type tagSeleccionadoType = {
    tag:TagType
    handleClick:({id, seleccionado}:handleClickPropsType) => void
}



export type handleClickPropsType = {
    id:number,
    seleccionado:boolean
};

export type handleClickType = {
    handleClick:({id, seleccionado}:handleClickPropsType) => void
};

export type showSelectedTags = {
    selectedTags: TagType[]
}

export type TagType = {
    id:number,
    name:string
};

export interface TagsBDType {
    tags:TagType[]
};

export type UserBDType = {
    nickName:string,
    id:number,
    email:string
};
//tipos de Post
//---------------------//

export interface postBDType {
    Tags:TagType[],
    User:UserBDType,
    UserId:number,
    description:string,
    id:number
}

export type verDetallePostType = (post:postBDType) => void

export type PostPerfilPropsTypes = {
    post:postBDType,
    images:imageBDType[],
    comments:commentBDType[],
    accionBtn:verDetallePostType,
    setPosts?: Dispatch<SetStateAction<postBDType[]>>
}

export type PostCompletoPropsType = {
    postId:number,
    description:string,
    Tags:TagType[],
    images:imageBDType[],
    comments:commentBDType[]
}

export type AgregarCommentPropsType = {
    handleSubmit:(e:React.FormEvent<HTMLFormElement>) => void,
    label:string,
    errores:any,
    placeholder:string,
    name:string,
    onChange:(e: React.ChangeEvent<HTMLInputElement>) => void
}

//tipos de Image
//--------------------//

export type imageBDType = {
    id:number,
    url:string,
    postId:number
}

//tipos de Comment
//-------------------//
export type commentBDType = {
    id:number,
    content:string,
    PostId:number,
    UserId:number
}
