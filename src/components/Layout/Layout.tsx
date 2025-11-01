import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import type { logoutProps } from "../../Types/Types";

const Layout = ({logout}:logoutProps) => {
    return <>
            <NavBar logout={logout} />
            <main>
                <Outlet />
            </main>
        </>
};

export default Layout;