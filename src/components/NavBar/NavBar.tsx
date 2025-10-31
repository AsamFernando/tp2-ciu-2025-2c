import {Container, Nav, Navbar} from 'react-bootstrap'
import {NavLink} from 'react-router-dom';

//agregar pagina publicaciones

const NavBar = () => {
    const secciones: {id:number, nombre:string, to:string}[] = [
        {id:1, nombre:'Home', to: '/Home'},
        {id:4, nombre:'Perfil', to: '/Perfil'},
    ];

    return (
        <Navbar sticky='top' expand="lg" className="bg-body-tertiary navbar-custom">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/" className="brand">Anti-Social-Network</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto nav-items">
                        {secciones.map(s => (
                            <Nav.Link
                                key={s.id}
                                as={NavLink}
                                to={s.to}
                                end
                                // className={({ isActive }) => isActive ? 'nav-link-custom active' : 'nav-link-custom'}
                            >
                                {s.nombre}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar;