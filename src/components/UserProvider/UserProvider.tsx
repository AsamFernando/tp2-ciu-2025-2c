import { useState } from "react";
import {UserContext} from "../../Contexts";
import type { ReactNode } from "react";

interface Props {
    children:ReactNode
};

interface userState {
    nickName:string,
    logueado:boolean,
};

const UsuarioProvider = ({ children }: Props) => {
    /* para el tipo de user en useState defino el tipo
    de la parte del estado solo los atributos de user con la interface userState */
    const [user, setUser] = useState<userState>({nickName:"puto el q lee", logueado:false});
    return (
        /* value tiene q tener el tipo de UserContextType definido en UserContext */
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};
export default UsuarioProvider;