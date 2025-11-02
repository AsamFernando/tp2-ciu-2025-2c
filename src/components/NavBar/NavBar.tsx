import {Container, Nav, Navbar, Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom';
import type { logoutProps } from '../../Types/Types';

//agregar pagina publicaciones --> hecho

const NavBar = ({logout}:logoutProps) => {

    const secciones: {id:number, nombre:string, to:string}[] = [
        {id:1, nombre:'Home', to: '/Home'},
        {id:2, nombre:'Perfil', to: '/Perfil'},
        {id:3, nombre:'Publicaciones', to: '/Publicaciones'},
    ];

    return (
        <Navbar sticky='top' expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/" className="brand">Anti-Social-Network</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto nav-items">
                        {secciones.map(s => (
                            <Nav.Link
                                key={s.id}
                                as={NavLink}
                                to={s.to}
                                end
                            >
                                {s.nombre}
                            </Nav.Link>
                        ))}
                    </Nav>
                    <div className='ms-auto'>
                        <Button variant='secondary' size='sm' onClick={logout}>Cerrar Sesion</Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar;