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
    errores:any
}
