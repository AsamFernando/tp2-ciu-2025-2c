import type { UserContextType, UserLogueadoType } from "../../Types/Types";

export const defaultUser: UserContextType = {
    user:{
        id:0,
        nickName:"",
        email:"",
        logueado:false
    },
    setUser:() => {}
};

export const userLogueadoDefault:UserLogueadoType = {
    id:0,
    nickName:"",
    email:"",
    logueado:false
};