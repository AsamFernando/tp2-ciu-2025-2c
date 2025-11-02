import { useState } from "react";
import {UserContext} from "../../Contexts";
import type { UserLogueadoType, Props } from "../../Types/Types";
import { userLogueadoDefault } from "../../Contexts/default/userDefault";

const UsuarioProvider = ({ children }: Props) => {
    const [user, setUser] = useState<UserLogueadoType>(userLogueadoDefault);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};
export default UsuarioProvider;

/*--Comentarios-- 
para el tipo de user en useState defino el tipo
de la parte del estado solo los atributos de user con la interface userState */
/* value tiene q tener el tipo de UserContextType definido en UserContext */