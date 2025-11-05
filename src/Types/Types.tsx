import type { ReactNode } from "react";

export interface UserContextType {
    user:{
        id:number,
        nickName:string,
        email:string,
        logueado:boolean
    }
    setUser:React.Dispatch<React.SetStateAction<UserLogueadoType>>;
};

export type TagType = {
    id:number,
    name:string
}

export interface TagsContextType {
    tags:TagType[]
    setTags:React.Dispatch<React.SetStateAction<TagType[]>>;
};

export interface TagsBDType {
    tags:TagType[]
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

export type inputsLoginType = {
    controlId:string,
    label:string,
    placeholder:string,
    name:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void,
    onClick:() => void
    errores:any
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