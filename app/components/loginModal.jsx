'use client';

import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function LoginModal({ show, handleClose, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Inicio de sesión exitoso');
        onLoginSuccess(); 
        handleClose();
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión, por favor intenta nuevamente');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Inicio de Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          {/* Campo para el nombre */}
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

          {/* Campo para la cédula */}
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

          <Button type="submit" variant="primary" className="w-100">
            Iniciar Sesión
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
