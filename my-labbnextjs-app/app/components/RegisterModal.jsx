

'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

export default function RegisterModal({ show, onClose }) {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    rol: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (show) {
      fetch('/api/roles')
        .then((res) => res.json())
        .then((data) => {
          setRoles(data);
        })
        .catch(() => setError('No se pudieron cargar los roles'));
    }
  }, [show]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    
    if (!form.nombre || !form.apellido || !form.cedula || !form.rol) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Error al registrar usuario.');
        return;
      }

      setSuccess('Usuario registrado correctamente.');
      setForm({ nombre: '', apellido: '', cedula: '', rol: '' });

      // Cerrar modal tras 2 segundos (opcional)
      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 2000);
    } catch {
      setError('Error de conexión al registrar usuario.');
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCedula">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={form.cedula}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRol">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un rol</option>
              {roles.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Registrar
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
