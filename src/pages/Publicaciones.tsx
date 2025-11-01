import { useContext } from "react";
import { UserContext } from "../Contexts";


const Publicaciones = () => {
    const {user} = useContext(UserContext);

    return <h1>{`Publicaciones de ${user.nickName}`}</h1>
};

export default Publicaciones;