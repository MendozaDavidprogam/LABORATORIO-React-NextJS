'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function ArticuloModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    titulo: '',
    informacion: '',
    categoria: '',
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetchCategorias() {
      const res = await fetch('/api/categorias'); 
      const data = await res.json();
      setCategorias(data);
    }
    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Convertir a número sólo para el campo categoria
      [name]: name === 'categoria' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/publicar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Artículo registrado con éxito');
      handleClose();
    } else {
      alert('Error al registrar el artículo');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Artículo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              required
              value={formData.titulo}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Información</Form.Label>
            <Form.Control
              as="textarea"
              name="informacion"
              required
              value={formData.informacion}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria"
              required
              value={formData.categoria}
              onChange={handleChange}
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria._id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Registrar Artículo
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
