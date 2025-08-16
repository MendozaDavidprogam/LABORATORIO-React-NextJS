
'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import {  Navbar,  Container,  Nav,  Button,  Row,  Col,  Spinner,  Form,  Alert,  Badge,  Dropdown,
} from 'react-bootstrap';

import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import ArticleModal from './components/ArticleModal';
import ArticleCard from './components/ArticleCard';
import ArticleViewModal from './components/ArticleViewModal';

export default function Home() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <strong>Portal de Noticias</strong>
          </Navbar.Brand>
          <Nav className="ms-auto align-items-center">
            {user && (
              <Nav.Item className="me-3">
                <span className="text-light">
                  Hola, {user.nombre} ({user.rol === 1 ? 'Autor' : 'Lector'})
                </span>
              </Nav.Item>
            )}

            {user && (
              <Nav.Item className="me-3">
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-notificaciones"
                    style={{ position: 'relative' }}
                  >
                    🔔
                    <Badge
                      bg={cantidadNoLeidas > 0 ? 'danger' : 'secondary'}
                      pill
                      style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)' }}
                    >
                      {cantidadNoLeidas}
                    </Badge>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ maxHeight: '400px', overflowY: 'auto', minWidth: '300px' }}>
                    {notificaciones.length === 0 ? (
                      <Dropdown.ItemText className="text-muted text-center">
                        No hay notificaciones
                      </Dropdown.ItemText>
                    ) : (
                      notificaciones.map((n) => (
                        <Dropdown.Item
                          key={n._id}
                          className={n.leido ? '' : 'fw-bold'}
                          onClick={async () => {
                            if (!n.leido) {
                              try {
                                const res = await fetch('/api/notificaciones', {
                                  method: 'PATCH',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ notificacionId: n._id }),
                                });
                                if (!res.ok) throw new Error('Error al marcar notificación como leída');

                                setNotificaciones((prev) =>
                                  prev.map((notif) =>
                                    notif._id === n._id ? { ...notif, leido: true } : notif
                                  )
                                );
                              } catch (error) {
                                console.error(error);
                              }
                            }

                            if (n.articuloId) {
                              handleSelectArticulo(n.articuloId);
                            }
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          {n.mensaje}
                        </Dropdown.Item>
                      ))
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            )}

            {!user ? (
              <>
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={() => setShowRegisterModal(true)}
                >
                  Registrar
                </Button>
                <Button variant="outline-light" onClick={() => setShowLoginModal(true)}>
                  Iniciar Sesión
                </Button>
              </>
            ) : (
              <>
                {user.rol === 1 && (
                  <Button
                    variant="outline-light"
                    className="me-2"
                    onClick={() => setShowArticleModal(true)}
                  >
                    Registrar Artículo
                  </Button>
                )}
                <Button variant="outline-light" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* Contenido principal */}
      <main className="container flex-grow-1 py-4">
        <h1 className="text-center mb-4">Bienvenido al Portal de Noticias</h1>

        {mensajeLogout && (
          <Alert variant="success" className="text-center">
            Sesión cerrada correctamente.
          </Alert>
        )}

        {user && (
          <p className="text-center">
            Has iniciado sesión como <strong>{user.nombre}</strong> con rol{' '}
            <strong>{user.rol === 1 ? 'Autor' : 'Lector'}</strong>.
          </p>
        )}

        {/* Formulario de búsqueda */}
        <Form onSubmit={handleBuscar} className="mb-4">
          <Row className="align-items-end">
            <Col md={4}>
              <Form.Group controlId="filtroTitulo">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Buscar por título"
                  value={filtroTitulo}
                  onChange={(e) => setFiltroTitulo(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="filtroCategoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Buscar por categoría"
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="filtroFecha">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  value={filtroFecha}
                  onChange={(e) => setFiltroFecha(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex gap-2">
              <Button variant="primary" type="submit" className="flex-grow-1">
                Buscar
              </Button>
              <Button variant="secondary" onClick={handleLimpiarFiltros} className="flex-grow-1">
                Limpiar
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Artículos */}
        <Row>
          {loading ? (
            <Col className="text-center">
              <Spinner animation="border" variant="primary" />
            </Col>
          ) : articulos.length === 0 ? (
            <Col className="text-center">No hay artículos disponibles.</Col>
          ) : (
            articulos.map((articulo) => (
              <Col key={articulo._id} md={4} className="mb-4">
                <ArticleCard articulo={articulo} onSelect={handleSelectArticulo} />
              </Col>
            ))
          )}
        </Row>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>© 2025 Portal de Noticias. Todos los derechos reservados.</p>
      </footer>

      {/* Modales */}
      <RegisterModal show={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={(usuario) => {
          setUser(usuario);
          localStorage.setItem('usuario', JSON.stringify(usuario));
          setShowLoginModal(false);
        }}
      />
      {user?.rol === 1 && (
        <ArticleModal
          show={showArticleModal}
          onClose={() => {
            setShowArticleModal(false);
            fetchArticulos();
          }}
          user={user}
        />
      )}
      <ArticleViewModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        articulo={articuloSeleccionado}
      />
    </div>
  );
}