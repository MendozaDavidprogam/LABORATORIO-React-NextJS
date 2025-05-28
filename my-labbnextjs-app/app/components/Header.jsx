// app/components/Header.jsx
import { Navbar, NavbarBrand, Container, Nav, Button } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <NavbarBrand href="/">
          <strong>Portal de Noticias</strong>
        </NavbarBrand>
        <Nav className="ms-auto">
          <Button variant="outline-light" className="me-2">Registrar</Button>
          <Button variant="outline-light">Iniciar Sesión</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
