'use client';

import { useEffect, useState } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';

export default function ArticleViewModal({ show, onClose, articulo }) {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [respuesta, setRespuesta] = useState({});
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');

  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('usuario')) : null;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (articulo) fetchComentarios();
  }, [articulo]);

  const fetchComentarios = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comentarios?articuloId=${articulo.articuloId}`);
      const data = await res.json();
      setComentarios(data);
    } catch (err) {
      console.error('Error al cargar comentarios:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleComentar = async () => {
    if (!nuevoComentario.trim()) return;

    const res = await fetch('/api/comentarios', {
      method: 'POST',
      body: JSON.stringify({
        articuloId: articulo.articuloId,
        usuarioId: user.usuarioId,
        nombreUsuario: user.nombre,
        descripcion: nuevoComentario.trim(),
      }),
    });

    if (res.ok) {
      setNuevoComentario('');
      fetchComentarios();
    }
  };

  const handleResponder = async (comentarioIdPadre) => {
    if (!respuesta[comentarioIdPadre]?.trim()) return;

    const res = await fetch('/api/comentarios', {
      method: 'POST',
      body: JSON.stringify({
        articuloId: articulo.articuloId,
        usuarioId: user.usuarioId,
        nombreUsuario: user.nombre,
        descripcion: respuesta[comentarioIdPadre],
        comentarioIdPadre,
      }),
    });

    if (res.ok) {
      setRespuesta((prev) => ({ ...prev, [comentarioIdPadre]: '' }));
      fetchComentarios();
    }
  };

  const handleShare = async () => {
    const mensaje = `${articulo.titulo}\n\nLee más aquí: ${url}`;
  
    if (navigator.share) {
      try {
        await navigator.share({
          title: articulo.titulo,
          text: mensaje,
          url: url,
        });
      } catch (error) {
        console.error('Error al compartir:', error);
      }
    } else {
      alert(`Copia y comparte este enlace:\n\n${url}`);
    }
  
    if (user && user.usuarioId !== articulo.usuarioId) {
      await fetch('/api/articulos/compartir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioIdCompartidor: user.usuarioId,
          articuloId: articulo.articuloId,
        }),
      });
    }
  }; 

  if (!articulo) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center justify-content-between w-100">
          <span>{articulo.titulo}</span>
          <Button variant="outline-primary" size="sm" onClick={handleShare}>
            Compartir
          </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={articulo.imagen || 'https://via.placeholder.com/150'}
          alt="Imagen del artículo"
          className="img-fluid mb-3"
        />
        <p><strong>Autor:</strong> {articulo.autor || 'Desconocido'}</p>
        <p><strong>Categoría:</strong> {articulo.categoria}</p>
        <p><strong>Descripción:</strong></p>
        <p>{articulo.descripcion}</p>
        <p><small>Publicado el {new Date(articulo.fechaCreacion).toLocaleString()}</small></p>

        <hr />

        <h5>Comentarios</h5>

        {loading ? (
          <Spinner animation="border" />
        ) : comentarios.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          comentarios.map((comentario) => (
            <div key={comentario.comentarioId} className="mb-3">
              <strong>{comentario.nombreUsuario}</strong> dijo:
              <p>{comentario.descripcion}</p>
              <small>{new Date(comentario.fecha).toLocaleString()}</small>

              {/* Respuestas */}
              {comentario.respuestas?.length > 0 && (
                <div className="ms-3 mt-2">
                  {comentario.respuestas.map((resp, idx) => (
                    <div key={idx}>
                      <strong>{resp.nombreUsuario}</strong> respondió:
                      <p>{resp.descripcion}</p>
                      <small>{new Date(resp.fecha).toLocaleString()}</small>
                    </div>
                  ))}
                </div>
              )}

              {/* Campo para responder */}
              {user && (
                <Form.Group className="mt-2 ms-3">
                  <Form.Control
                    type="text"
                    placeholder="Responder..."
                    value={respuesta[comentario.comentarioId] || ''}
                    onChange={(e) =>
                      setRespuesta({ ...respuesta, [comentario.comentarioId]: e.target.value })
                    }
                  />
                  <Button
                    size="sm"
                    variant="primary"
                    className="mt-1"
                    onClick={() => handleResponder(comentario.comentarioId)}
                  >
                    Responder
                  </Button>
                </Form.Group>
              )}
            </div>
          ))
        )}

        {/* Comentar nuevo */}
        {user ? (
          <Form.Group className="mt-4">
            <Form.Label>Dejar un comentario</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              placeholder="Escribe tu comentario..."
            />
            <Button className="mt-2" onClick={handleComentar}>
              Comentar
            </Button>
          </Form.Group>
        ) : (
          <Alert variant="warning" className="mt-3">
            Inicia sesión para dejar un comentario.
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}
