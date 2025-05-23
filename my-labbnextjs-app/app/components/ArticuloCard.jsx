// components/ArticuloCard.jsx
'use client';

import { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';

export default function ArticuloCard({ articulo }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card className="h-100 shadow-sm" style={{ maxWidth: '400px', margin: 'auto' }}>
        {articulo.imagen && (
          <Card.Img
            variant="top"
            src={articulo.imagen}
            alt="Imagen del artículo"
            style={{
              maxHeight: '220px',
              objectFit: 'cover',
              borderTopLeftRadius: '.25rem',
              borderTopRightRadius: '.25rem',
            }}
          />
        )}
        <Card.Body className="p-4">
          <Card.Title className="h5">{articulo.titulo}</Card.Title>
          <Card.Text
            style={{
              fontSize: '1rem',
              maxHeight: '110px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {articulo.informacion.length > 120
              ? articulo.informacion.substring(0, 120) + '...'
              : articulo.informacion}
          </Card.Text>
          <Button variant="primary" size="md" onClick={handleShow} className="w-100">
            Ver más
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{articulo.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {articulo.imagen && (
            <img src={articulo.imagen} alt="Imagen" className="img-fluid mb-3" />
          )}
          <p><strong>ID del Artículo:</strong> {articulo.articuloId || articulo.idarticulo}</p>
          <p><strong>Información:</strong></p>
          <p>{articulo.informacion}</p>
          <p><strong>Categoría ID:</strong> {articulo.categoria}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}