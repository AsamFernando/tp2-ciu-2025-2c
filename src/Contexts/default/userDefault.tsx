import type { UserContextType, UserLogueadoType } from "../../Types/Types";

export const defaultUser: UserContextType = {
    user:{
        nickName:"",
        email:"",
        logueado:false
    },
    setUser:() => {}
};

export const userLogueadoDefault:UserLogueadoType = {
    nickName:"",
    email:"",
    logueado:false
};