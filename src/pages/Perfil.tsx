import { useContext } from "react";
import { UserContext } from "../Contexts";

const Perfil = () => {
    const {user} = useContext(UserContext);

    return <h1>{`Perfil de ${user.nickName}`}</h1>
};

export default Perfil;