import { createContext } from "react";

export interface UserContextType {
    user:{nickName:string, logueado:boolean}
    setUser:React.Dispatch<React.SetStateAction<{nickName:string, logueado:boolean}>>;
};

export const defaultUser: UserContextType = {
    user:{nickName:"puto el q lee", logueado:false},
    setUser:() => {}
};

const userContext = createContext<UserContextType>(defaultUser);

export default userContext;