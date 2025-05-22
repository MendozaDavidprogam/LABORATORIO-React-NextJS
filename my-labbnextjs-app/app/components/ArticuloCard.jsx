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
      <Card className="h-100">
        <Card.Body>
          <Card.Title>{articulo.titulo}</Card.Title>
          <Card.Text>
            {articulo.informacion.length > 100
              ? articulo.informacion.substring(0, 100) + '...'
              : articulo.informacion}
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Ver más
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{articulo.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
