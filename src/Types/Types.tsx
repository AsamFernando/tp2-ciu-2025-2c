import type { ReactNode } from "react";

export interface UserContextType {
    user:{
        nickName:string,
        email:string,
        logueado:boolean
    }
    setUser:React.Dispatch<React.SetStateAction<UserLogueadoType>>;
};

export interface UserLogueadoType {
    nickName:string,
    email:string,
    logueado:boolean
};

export type userBD = Omit<UserLogueadoType, 'logueado'>

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
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => Promise<void>,
    errores:any
}
