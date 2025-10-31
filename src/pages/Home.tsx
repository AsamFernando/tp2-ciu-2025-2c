import { useContext } from "react";
import { UserContext } from "../Contexts";


const Home = () => {
    const {user} = useContext(UserContext);

    return <h1>{`Bienvenido/a ${user.nickName}`}</h1>
};

export default Home;