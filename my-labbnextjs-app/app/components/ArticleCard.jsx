
'use client';

import { Card, Button } from 'react-bootstrap';

export default function ArticleCard({ articulo, onSelect }) {
  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={articulo.imagen || 'https://via.placeholder.com/150'} />
      <Card.Body>
        <Card.Title>{articulo.titulo}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Autor: {articulo.autor || 'Desconocido'}
        </Card.Subtitle>
        <Card.Text>
          {articulo.descripcion.length > 100
            ? articulo.descripcion.slice(0, 100) + '...'
            : articulo.descripcion}
        </Card.Text>
        <Button variant="primary" onClick={() => onSelect(articulo)}>
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
}