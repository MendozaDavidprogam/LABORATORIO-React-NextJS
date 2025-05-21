'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function RegisterModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    rol: '',
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    async function fetchRoles() {
      const res = await fetch('/api/roles');
      const data = await res.json();
      setRoles(data);
    }
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Usuario registrado con éxito');
      handleClose();
    } else {
      alert('Error al registrar el usuario');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registro de Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              required
              value={formData.apellido}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              required
              value={formData.cedula}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              name="rol"
              required
              value={formData.rol}
              onChange={handleChange}
            >
              <option value="">Selecciona un rol</option>
              {roles.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Registrar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
