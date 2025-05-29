
'use client';

import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

export default function ArticleModal({ show, onClose, user }) {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
    categoria: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.titulo || !form.descripcion || !form.categoria) {
      setError('Por favor complete todos los campos obligatorios.');
      return;
    }

    try {
      const res = await fetch('/api/articulos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, usuarioId: user.usuarioId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error al crear el artículo.');
        return;
      }

      setSuccess('Artículo creado correctamente.');
      setForm({ titulo: '', descripcion: '', imagen: '', categoria: '' });

      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 1500);
    } catch (err) {
      setError('Error en la conexión con el servidor.');
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Artículo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label>Título *</Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>Descripción *</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategoria">
            <Form.Label>Categoría *</Form.Label>
            <Form.Control
              type="text"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              placeholder="Ejemplo: Política, Tecnología, Deportes"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImagen">
            <Form.Label>Imagen (URL opcional)</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
              placeholder="URL de la imagen"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Crear Artículo
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}